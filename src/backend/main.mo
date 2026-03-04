import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type CruiseDeal = {
    id : Text;
    destination : Text;
    cruiseLine : Text;
    shipName : Text;
    durationNights : Nat;
    departurePort : Text;
    pricePerPerson : Float;
    currency : Text;
    discountPct : Nat;
    rating : Float;
    highlights : [Text];
  };

  type Destination = {
    id : Text;
    name : Text;
    description : Text;
  };

  type Carrier = {
    id : Text;
    name : Text;
  };

  type SavedDeals = {
    deals : List.List<Text>;
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let deals = Map.empty<Text, CruiseDeal>();
  let destinations = Map.empty<Text, Destination>();
  let carriers = Map.empty<Text, Carrier>();
  let userSavedDeals = Map.empty<Principal, SavedDeals>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile functions

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Query functions (no auth required - available to all including guests)

  public query ({ caller }) func getAllDeals() : async [CruiseDeal] {
    deals.values().toArray();
  };

  public query ({ caller }) func getDealsByDestination(destination : Text) : async [CruiseDeal] {
    let filteredDeals = List.empty<CruiseDeal>();
    for (deal in deals.values()) {
      if (Text.equal(deal.destination, destination)) {
        filteredDeals.add(deal);
      };
    };
    filteredDeals.toArray();
  };

  public query ({ caller }) func getDealsByCarrier(carrier : Text) : async [CruiseDeal] {
    let filteredDeals = List.empty<CruiseDeal>();
    for (deal in deals.values()) {
      if (Text.equal(deal.cruiseLine, carrier)) {
        filteredDeals.add(deal);
      };
    };
    filteredDeals.toArray();
  };

  public query ({ caller }) func getDeal(id : Text) : async ?CruiseDeal {
    deals.get(id);
  };

  public query ({ caller }) func getDestinations() : async [Destination] {
    destinations.values().toArray();
  };

  public query ({ caller }) func getCarriers() : async [Carrier] {
    carriers.values().toArray();
  };

  // User favorites (auth required - users only)

  public shared ({ caller }) func saveDeal(dealId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save deals");
    };
    switch (deals.get(dealId)) {
      case (null) { Runtime.trap("Deal Does Not Exist") };
      case (?_) {
        let savedDeals = switch (userSavedDeals.get(caller)) {
          case (null) { List.empty<Text>() };
          case (?existing) { existing.deals };
        };
        savedDeals.add(dealId);
        userSavedDeals.add(caller, { deals = savedDeals });
        true;
      };
    };
  };

  public shared ({ caller }) func removeSavedDeal(dealId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove saved deals");
    };
    switch (userSavedDeals.get(caller)) {
      case (null) { false };
      case (?saved) {
        let filteredDeals = saved.deals.filter(func(id) { id != dealId });
        userSavedDeals.add(caller, { deals = filteredDeals });
        true;
      };
    };
  };

  public query ({ caller }) func getSavedDeals() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view saved deals");
    };
    switch (userSavedDeals.get(caller)) {
      case (null) { [] };
      case (?saved) { saved.deals.toArray() };
    };
  };
};
