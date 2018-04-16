const { Prisma } = require('prisma-binding')
const { GraphQLResolveInfo } = require('graphql')

const typeDefs = `
type Amenities implements Node {
  id: ID!
  place(where: PlaceWhereInput): Place!
  elevator: Boolean!
  petsAllowed: Boolean!
  internet: Boolean!
  kitchen: Boolean!
  wirelessInternet: Boolean!
  familyKidFriendly: Boolean!
  freeParkingOnPremises: Boolean!
  hotTub: Boolean!
  pool: Boolean!
  smokingAllowed: Boolean!
  wheelchairAccessible: Boolean!
  breakfast: Boolean!
  cableTv: Boolean!
  suitableForEvents: Boolean!
  dryer: Boolean!
  washer: Boolean!
  indoorFireplace: Boolean!
  tv: Boolean!
  heating: Boolean!
  hangers: Boolean!
  iron: Boolean!
  hairDryer: Boolean!
  doorman: Boolean!
  paidParkingOffPremises: Boolean!
  freeParkingOnStreet: Boolean!
  gym: Boolean!
  airConditioning: Boolean!
  shampoo: Boolean!
  essentials: Boolean!
  laptopFriendlyWorkspace: Boolean!
  privateEntrance: Boolean!
  buzzerWirelessIntercom: Boolean!
  babyBath: Boolean!
  babyMonitor: Boolean!
  babysitterRecommendations: Boolean!
  bathtub: Boolean!
  changingTable: Boolean!
  childrensBooksAndToys: Boolean!
  childrensDinnerware: Boolean!
  crib: Boolean!
}

type Booking implements Node {
  id: ID!
  createdAt: DateTime!
  bookee(where: UserWhereInput): User!
  place(where: PlaceWhereInput): Place!
  startDate: DateTime!
  endDate: DateTime!
  payment(where: PaymentWhereInput): Payment!
}

type City implements Node {
  id: ID!
  name: String!
  neighbourhoods(where: NeighbourhoodWhereInput, orderBy: NeighbourhoodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Neighbourhood!]
}

type CreditCardInformation implements Node {
  id: ID!
  createdAt: DateTime!
  cardNumber: String!
  expiresOnMonth: Int!
  expiresOnYear: Int!
  securityCode: String!
  firstName: String!
  lastName: String!
  postalCode: String!
  country: String!
  paymentAccount(where: PaymentAccountWhereInput): PaymentAccount
}

type Experience implements Node {
  id: ID!
  category(where: ExperienceCategoryWhereInput): ExperienceCategory
  title: String!
  host(where: UserWhereInput): User!
  location(where: LocationWhereInput): Location!
  pricePerPerson: Int!
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  preview(where: PictureWhereInput): Picture!
  popularity: Int!
}

type ExperienceCategory implements Node {
  id: ID!
  mainColor: String!
  name: String!
  experience(where: ExperienceWhereInput): Experience
}

type GuestRequirements implements Node {
  id: ID!
  govIssuedId: Boolean!
  recommendationsFromOtherHosts: Boolean!
  guestTripInformation: Boolean!
  place(where: PlaceWhereInput): Place!
}

type HouseRules implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  suitableForChildren: Boolean
  suitableForInfants: Boolean
  petsAllowed: Boolean
  smokingAllowed: Boolean
  partiesAndEventsAllowed: Boolean
  additionalRules: String
}

type Location implements Node {
  id: ID!
  lat: Float!
  lng: Float!
  neighbourHood(where: NeighbourhoodWhereInput): Neighbourhood
  user(where: UserWhereInput): User
  place(where: PlaceWhereInput): Place
  address: String
  directions: String
  experience(where: ExperienceWhereInput): Experience
  restaurant(where: RestaurantWhereInput): Restaurant
}

type Message implements Node {
  id: ID!
  createdAt: DateTime!
  from(where: UserWhereInput): User!
  to(where: UserWhereInput): User!
  deliveredAt: DateTime!
  readAt: DateTime!
}

type Neighbourhood implements Node {
  id: ID!
  locations(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Location!]
  name: String!
  slug: String!
  homePreview(where: PictureWhereInput): Picture
  city(where: CityWhereInput): City!
  featured: Boolean!
  popularity: Int!
}

type Notification implements Node {
  id: ID!
  createdAt: DateTime!
  type: NOTIFICATION_TYPE
  user(where: UserWhereInput): User!
  link: String!
  readDate: DateTime!
}

type Payment implements Node {
  id: ID!
  createdAt: DateTime!
  serviceFee: Float!
  placePrice: Float!
  totalPrice: Float!
  booking(where: BookingWhereInput): Booking!
  paymentMethod(where: PaymentAccountWhereInput): PaymentAccount!
}

type PaymentAccount implements Node {
  id: ID!
  createdAt: DateTime!
  type: PAYMENT_PROVIDER
  user(where: UserWhereInput): User!
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment!]
  paypal(where: PaypalInformationWhereInput): PaypalInformation
  creditcard(where: CreditCardInformationWhereInput): CreditCardInformation
}

type PaypalInformation implements Node {
  id: ID!
  createdAt: DateTime!
  email: String!
  paymentAccount(where: PaymentAccountWhereInput): PaymentAccount!
}

type Place implements Node {
  id: ID!
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  amenities(where: AmenitiesWhereInput): Amenities!
  host(where: UserWhereInput): User!
  pricing(where: PricingWhereInput): Pricing!
  location(where: LocationWhereInput): Location!
  views(where: ViewsWhereInput): Views!
  guestRequirements(where: GuestRequirementsWhereInput): GuestRequirements
  policies(where: PoliciesWhereInput): Policies
  houseRules(where: HouseRulesWhereInput): HouseRules
  bookings(where: BookingWhereInput, orderBy: BookingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Booking!]
  pictures(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Picture!]
  popularity: Int!
}

type Policies implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  checkInStartTime: Float!
  checkInEndTime: Float!
  checkoutTime: Float!
  place(where: PlaceWhereInput): Place!
}

type Pricing implements Node {
  id: ID!
  place(where: PlaceWhereInput): Place!
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int!
  smartPricing: Boolean!
  basePrice: Int!
  averageWeekly: Int!
  averageMonthly: Int!
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
}

type Restaurant implements Node {
  id: ID!
  createdAt: DateTime!
  title: String!
  avgPricePerPerson: Int!
  pictures(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Picture!]
  location(where: LocationWhereInput): Location!
  isCurated: Boolean!
  slug: String!
  popularity: Int!
}

type Review implements Node {
  id: ID!
  createdAt: DateTime!
  text: String!
  stars: Int!
  accuracy: Int!
  location: Int!
  checkIn: Int!
  value: Int!
  cleanliness: Int!
  communication: Int!
  place(where: PlaceWhereInput): Place!
  experience(where: ExperienceWhereInput): Experience
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean!
  ownedPlaces(where: PlaceWhereInput, orderBy: PlaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Place!]
  location(where: LocationWhereInput): Location
  bookings(where: BookingWhereInput, orderBy: BookingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Booking!]
  paymentAccount(where: PaymentAccountWhereInput, orderBy: PaymentAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PaymentAccount!]
  sentMessages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  receivedMessages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification!]
  profilePicture(where: PictureWhereInput): Picture
  hostingExperiences(where: ExperienceWhereInput, orderBy: ExperienceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Experience!]
}

type Views implements Node {
  id: ID!
  lastWeek: Int!
  place(where: PlaceWhereInput): Place!
}

type AggregateAmenities {
  count: Int!
}

type AggregateBooking {
  count: Int!
}

type AggregateCity {
  count: Int!
}

type AggregateCreditCardInformation {
  count: Int!
}

type AggregateExperience {
  count: Int!
}

type AggregateExperienceCategory {
  count: Int!
}

type AggregateGuestRequirements {
  count: Int!
}

type AggregateHouseRules {
  count: Int!
}

type AggregateLocation {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregateNeighbourhood {
  count: Int!
}

type AggregateNotification {
  count: Int!
}

type AggregatePayment {
  count: Int!
}

type AggregatePaymentAccount {
  count: Int!
}

type AggregatePaypalInformation {
  count: Int!
}

type AggregatePicture {
  count: Int!
}

type AggregatePlace {
  count: Int!
}

type AggregatePolicies {
  count: Int!
}

type AggregatePricing {
  count: Int!
}

type AggregateRestaurant {
  count: Int!
}

type AggregateReview {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateViews {
  count: Int!
}

"""
A connection to a list of items.
"""
type AmenitiesConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [AmenitiesEdge]!
  aggregate: AggregateAmenities!
}

input AmenitiesCreateInput {
  elevator: Boolean
  petsAllowed: Boolean
  internet: Boolean
  kitchen: Boolean
  wirelessInternet: Boolean
  familyKidFriendly: Boolean
  freeParkingOnPremises: Boolean
  hotTub: Boolean
  pool: Boolean
  smokingAllowed: Boolean
  wheelchairAccessible: Boolean
  breakfast: Boolean
  cableTv: Boolean
  suitableForEvents: Boolean
  dryer: Boolean
  washer: Boolean
  indoorFireplace: Boolean
  tv: Boolean
  heating: Boolean
  hangers: Boolean
  iron: Boolean
  hairDryer: Boolean
  doorman: Boolean
  paidParkingOffPremises: Boolean
  freeParkingOnStreet: Boolean
  gym: Boolean
  airConditioning: Boolean
  shampoo: Boolean
  essentials: Boolean
  laptopFriendlyWorkspace: Boolean
  privateEntrance: Boolean
  buzzerWirelessIntercom: Boolean
  babyBath: Boolean
  babyMonitor: Boolean
  babysitterRecommendations: Boolean
  bathtub: Boolean
  changingTable: Boolean
  childrensBooksAndToys: Boolean
  childrensDinnerware: Boolean
  crib: Boolean
  place: PlaceCreateOneWithoutAmenitiesInput!
}

input AmenitiesCreateOneWithoutPlaceInput {
  create: AmenitiesCreateWithoutPlaceInput
  connect: AmenitiesWhereUniqueInput
}

input AmenitiesCreateWithoutPlaceInput {
  elevator: Boolean
  petsAllowed: Boolean
  internet: Boolean
  kitchen: Boolean
  wirelessInternet: Boolean
  familyKidFriendly: Boolean
  freeParkingOnPremises: Boolean
  hotTub: Boolean
  pool: Boolean
  smokingAllowed: Boolean
  wheelchairAccessible: Boolean
  breakfast: Boolean
  cableTv: Boolean
  suitableForEvents: Boolean
  dryer: Boolean
  washer: Boolean
  indoorFireplace: Boolean
  tv: Boolean
  heating: Boolean
  hangers: Boolean
  iron: Boolean
  hairDryer: Boolean
  doorman: Boolean
  paidParkingOffPremises: Boolean
  freeParkingOnStreet: Boolean
  gym: Boolean
  airConditioning: Boolean
  shampoo: Boolean
  essentials: Boolean
  laptopFriendlyWorkspace: Boolean
  privateEntrance: Boolean
  buzzerWirelessIntercom: Boolean
  babyBath: Boolean
  babyMonitor: Boolean
  babysitterRecommendations: Boolean
  bathtub: Boolean
  changingTable: Boolean
  childrensBooksAndToys: Boolean
  childrensDinnerware: Boolean
  crib: Boolean
}

"""
An edge in a connection.
"""
type AmenitiesEdge {
  """
  The item at the end of the edge.
  """
  node: Amenities!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum AmenitiesOrderByInput {
  id_ASC
  id_DESC
  elevator_ASC
  elevator_DESC
  petsAllowed_ASC
  petsAllowed_DESC
  internet_ASC
  internet_DESC
  kitchen_ASC
  kitchen_DESC
  wirelessInternet_ASC
  wirelessInternet_DESC
  familyKidFriendly_ASC
  familyKidFriendly_DESC
  freeParkingOnPremises_ASC
  freeParkingOnPremises_DESC
  hotTub_ASC
  hotTub_DESC
  pool_ASC
  pool_DESC
  smokingAllowed_ASC
  smokingAllowed_DESC
  wheelchairAccessible_ASC
  wheelchairAccessible_DESC
  breakfast_ASC
  breakfast_DESC
  cableTv_ASC
  cableTv_DESC
  suitableForEvents_ASC
  suitableForEvents_DESC
  dryer_ASC
  dryer_DESC
  washer_ASC
  washer_DESC
  indoorFireplace_ASC
  indoorFireplace_DESC
  tv_ASC
  tv_DESC
  heating_ASC
  heating_DESC
  hangers_ASC
  hangers_DESC
  iron_ASC
  iron_DESC
  hairDryer_ASC
  hairDryer_DESC
  doorman_ASC
  doorman_DESC
  paidParkingOffPremises_ASC
  paidParkingOffPremises_DESC
  freeParkingOnStreet_ASC
  freeParkingOnStreet_DESC
  gym_ASC
  gym_DESC
  airConditioning_ASC
  airConditioning_DESC
  shampoo_ASC
  shampoo_DESC
  essentials_ASC
  essentials_DESC
  laptopFriendlyWorkspace_ASC
  laptopFriendlyWorkspace_DESC
  privateEntrance_ASC
  privateEntrance_DESC
  buzzerWirelessIntercom_ASC
  buzzerWirelessIntercom_DESC
  babyBath_ASC
  babyBath_DESC
  babyMonitor_ASC
  babyMonitor_DESC
  babysitterRecommendations_ASC
  babysitterRecommendations_DESC
  bathtub_ASC
  bathtub_DESC
  changingTable_ASC
  changingTable_DESC
  childrensBooksAndToys_ASC
  childrensBooksAndToys_DESC
  childrensDinnerware_ASC
  childrensDinnerware_DESC
  crib_ASC
  crib_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type AmenitiesPreviousValues {
  id: ID!
  elevator: Boolean!
  petsAllowed: Boolean!
  internet: Boolean!
  kitchen: Boolean!
  wirelessInternet: Boolean!
  familyKidFriendly: Boolean!
  freeParkingOnPremises: Boolean!
  hotTub: Boolean!
  pool: Boolean!
  smokingAllowed: Boolean!
  wheelchairAccessible: Boolean!
  breakfast: Boolean!
  cableTv: Boolean!
  suitableForEvents: Boolean!
  dryer: Boolean!
  washer: Boolean!
  indoorFireplace: Boolean!
  tv: Boolean!
  heating: Boolean!
  hangers: Boolean!
  iron: Boolean!
  hairDryer: Boolean!
  doorman: Boolean!
  paidParkingOffPremises: Boolean!
  freeParkingOnStreet: Boolean!
  gym: Boolean!
  airConditioning: Boolean!
  shampoo: Boolean!
  essentials: Boolean!
  laptopFriendlyWorkspace: Boolean!
  privateEntrance: Boolean!
  buzzerWirelessIntercom: Boolean!
  babyBath: Boolean!
  babyMonitor: Boolean!
  babysitterRecommendations: Boolean!
  bathtub: Boolean!
  changingTable: Boolean!
  childrensBooksAndToys: Boolean!
  childrensDinnerware: Boolean!
  crib: Boolean!
}

type AmenitiesSubscriptionPayload {
  mutation: MutationType!
  node: Amenities
  updatedFields: [String!]
  previousValues: AmenitiesPreviousValues
}

input AmenitiesSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AmenitiesSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AmenitiesSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AmenitiesWhereInput
}

input AmenitiesUpdateInput {
  elevator: Boolean
  petsAllowed: Boolean
  internet: Boolean
  kitchen: Boolean
  wirelessInternet: Boolean
  familyKidFriendly: Boolean
  freeParkingOnPremises: Boolean
  hotTub: Boolean
  pool: Boolean
  smokingAllowed: Boolean
  wheelchairAccessible: Boolean
  breakfast: Boolean
  cableTv: Boolean
  suitableForEvents: Boolean
  dryer: Boolean
  washer: Boolean
  indoorFireplace: Boolean
  tv: Boolean
  heating: Boolean
  hangers: Boolean
  iron: Boolean
  hairDryer: Boolean
  doorman: Boolean
  paidParkingOffPremises: Boolean
  freeParkingOnStreet: Boolean
  gym: Boolean
  airConditioning: Boolean
  shampoo: Boolean
  essentials: Boolean
  laptopFriendlyWorkspace: Boolean
  privateEntrance: Boolean
  buzzerWirelessIntercom: Boolean
  babyBath: Boolean
  babyMonitor: Boolean
  babysitterRecommendations: Boolean
  bathtub: Boolean
  changingTable: Boolean
  childrensBooksAndToys: Boolean
  childrensDinnerware: Boolean
  crib: Boolean
  place: PlaceUpdateOneWithoutAmenitiesInput
}

input AmenitiesUpdateOneWithoutPlaceInput {
  create: AmenitiesCreateWithoutPlaceInput
  connect: AmenitiesWhereUniqueInput
  delete: Boolean
  update: AmenitiesUpdateWithoutPlaceDataInput
  upsert: AmenitiesUpsertWithoutPlaceInput
}

input AmenitiesUpdateWithoutPlaceDataInput {
  elevator: Boolean
  petsAllowed: Boolean
  internet: Boolean
  kitchen: Boolean
  wirelessInternet: Boolean
  familyKidFriendly: Boolean
  freeParkingOnPremises: Boolean
  hotTub: Boolean
  pool: Boolean
  smokingAllowed: Boolean
  wheelchairAccessible: Boolean
  breakfast: Boolean
  cableTv: Boolean
  suitableForEvents: Boolean
  dryer: Boolean
  washer: Boolean
  indoorFireplace: Boolean
  tv: Boolean
  heating: Boolean
  hangers: Boolean
  iron: Boolean
  hairDryer: Boolean
  doorman: Boolean
  paidParkingOffPremises: Boolean
  freeParkingOnStreet: Boolean
  gym: Boolean
  airConditioning: Boolean
  shampoo: Boolean
  essentials: Boolean
  laptopFriendlyWorkspace: Boolean
  privateEntrance: Boolean
  buzzerWirelessIntercom: Boolean
  babyBath: Boolean
  babyMonitor: Boolean
  babysitterRecommendations: Boolean
  bathtub: Boolean
  changingTable: Boolean
  childrensBooksAndToys: Boolean
  childrensDinnerware: Boolean
  crib: Boolean
}

input AmenitiesUpsertWithoutPlaceInput {
  update: AmenitiesUpdateWithoutPlaceDataInput!
  create: AmenitiesCreateWithoutPlaceInput!
}

input AmenitiesWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AmenitiesWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AmenitiesWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  elevator: Boolean
  """
  All values that are not equal to given value.
  """
  elevator_not: Boolean
  petsAllowed: Boolean
  """
  All values that are not equal to given value.
  """
  petsAllowed_not: Boolean
  internet: Boolean
  """
  All values that are not equal to given value.
  """
  internet_not: Boolean
  kitchen: Boolean
  """
  All values that are not equal to given value.
  """
  kitchen_not: Boolean
  wirelessInternet: Boolean
  """
  All values that are not equal to given value.
  """
  wirelessInternet_not: Boolean
  familyKidFriendly: Boolean
  """
  All values that are not equal to given value.
  """
  familyKidFriendly_not: Boolean
  freeParkingOnPremises: Boolean
  """
  All values that are not equal to given value.
  """
  freeParkingOnPremises_not: Boolean
  hotTub: Boolean
  """
  All values that are not equal to given value.
  """
  hotTub_not: Boolean
  pool: Boolean
  """
  All values that are not equal to given value.
  """
  pool_not: Boolean
  smokingAllowed: Boolean
  """
  All values that are not equal to given value.
  """
  smokingAllowed_not: Boolean
  wheelchairAccessible: Boolean
  """
  All values that are not equal to given value.
  """
  wheelchairAccessible_not: Boolean
  breakfast: Boolean
  """
  All values that are not equal to given value.
  """
  breakfast_not: Boolean
  cableTv: Boolean
  """
  All values that are not equal to given value.
  """
  cableTv_not: Boolean
  suitableForEvents: Boolean
  """
  All values that are not equal to given value.
  """
  suitableForEvents_not: Boolean
  dryer: Boolean
  """
  All values that are not equal to given value.
  """
  dryer_not: Boolean
  washer: Boolean
  """
  All values that are not equal to given value.
  """
  washer_not: Boolean
  indoorFireplace: Boolean
  """
  All values that are not equal to given value.
  """
  indoorFireplace_not: Boolean
  tv: Boolean
  """
  All values that are not equal to given value.
  """
  tv_not: Boolean
  heating: Boolean
  """
  All values that are not equal to given value.
  """
  heating_not: Boolean
  hangers: Boolean
  """
  All values that are not equal to given value.
  """
  hangers_not: Boolean
  iron: Boolean
  """
  All values that are not equal to given value.
  """
  iron_not: Boolean
  hairDryer: Boolean
  """
  All values that are not equal to given value.
  """
  hairDryer_not: Boolean
  doorman: Boolean
  """
  All values that are not equal to given value.
  """
  doorman_not: Boolean
  paidParkingOffPremises: Boolean
  """
  All values that are not equal to given value.
  """
  paidParkingOffPremises_not: Boolean
  freeParkingOnStreet: Boolean
  """
  All values that are not equal to given value.
  """
  freeParkingOnStreet_not: Boolean
  gym: Boolean
  """
  All values that are not equal to given value.
  """
  gym_not: Boolean
  airConditioning: Boolean
  """
  All values that are not equal to given value.
  """
  airConditioning_not: Boolean
  shampoo: Boolean
  """
  All values that are not equal to given value.
  """
  shampoo_not: Boolean
  essentials: Boolean
  """
  All values that are not equal to given value.
  """
  essentials_not: Boolean
  laptopFriendlyWorkspace: Boolean
  """
  All values that are not equal to given value.
  """
  laptopFriendlyWorkspace_not: Boolean
  privateEntrance: Boolean
  """
  All values that are not equal to given value.
  """
  privateEntrance_not: Boolean
  buzzerWirelessIntercom: Boolean
  """
  All values that are not equal to given value.
  """
  buzzerWirelessIntercom_not: Boolean
  babyBath: Boolean
  """
  All values that are not equal to given value.
  """
  babyBath_not: Boolean
  babyMonitor: Boolean
  """
  All values that are not equal to given value.
  """
  babyMonitor_not: Boolean
  babysitterRecommendations: Boolean
  """
  All values that are not equal to given value.
  """
  babysitterRecommendations_not: Boolean
  bathtub: Boolean
  """
  All values that are not equal to given value.
  """
  bathtub_not: Boolean
  changingTable: Boolean
  """
  All values that are not equal to given value.
  """
  changingTable_not: Boolean
  childrensBooksAndToys: Boolean
  """
  All values that are not equal to given value.
  """
  childrensBooksAndToys_not: Boolean
  childrensDinnerware: Boolean
  """
  All values that are not equal to given value.
  """
  childrensDinnerware_not: Boolean
  crib: Boolean
  """
  All values that are not equal to given value.
  """
  crib_not: Boolean
  place: PlaceWhereInput
}

input AmenitiesWhereUniqueInput {
  id: ID
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type BookingConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [BookingEdge]!
  aggregate: AggregateBooking!
}

input BookingCreateInput {
  startDate: DateTime!
  endDate: DateTime!
  bookee: UserCreateOneWithoutBookingsInput!
  place: PlaceCreateOneWithoutBookingsInput!
  payment: PaymentCreateOneWithoutBookingInput!
}

input BookingCreateManyWithoutBookeeInput {
  create: [BookingCreateWithoutBookeeInput!]
  connect: [BookingWhereUniqueInput!]
}

input BookingCreateManyWithoutPlaceInput {
  create: [BookingCreateWithoutPlaceInput!]
  connect: [BookingWhereUniqueInput!]
}

input BookingCreateOneWithoutPaymentInput {
  create: BookingCreateWithoutPaymentInput
  connect: BookingWhereUniqueInput
}

input BookingCreateWithoutBookeeInput {
  startDate: DateTime!
  endDate: DateTime!
  place: PlaceCreateOneWithoutBookingsInput!
  payment: PaymentCreateOneWithoutBookingInput!
}

input BookingCreateWithoutPaymentInput {
  startDate: DateTime!
  endDate: DateTime!
  bookee: UserCreateOneWithoutBookingsInput!
  place: PlaceCreateOneWithoutBookingsInput!
}

input BookingCreateWithoutPlaceInput {
  startDate: DateTime!
  endDate: DateTime!
  bookee: UserCreateOneWithoutBookingsInput!
  payment: PaymentCreateOneWithoutBookingInput!
}

"""
An edge in a connection.
"""
type BookingEdge {
  """
  The item at the end of the edge.
  """
  node: Booking!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum BookingOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  startDate_ASC
  startDate_DESC
  endDate_ASC
  endDate_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BookingPreviousValues {
  id: ID!
  createdAt: DateTime!
  startDate: DateTime!
  endDate: DateTime!
}

type BookingSubscriptionPayload {
  mutation: MutationType!
  node: Booking
  updatedFields: [String!]
  previousValues: BookingPreviousValues
}

input BookingSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BookingSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BookingSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BookingWhereInput
}

input BookingUpdateInput {
  startDate: DateTime
  endDate: DateTime
  bookee: UserUpdateOneWithoutBookingsInput
  place: PlaceUpdateOneWithoutBookingsInput
  payment: PaymentUpdateOneWithoutBookingInput
}

input BookingUpdateManyWithoutBookeeInput {
  create: [BookingCreateWithoutBookeeInput!]
  connect: [BookingWhereUniqueInput!]
  disconnect: [BookingWhereUniqueInput!]
  delete: [BookingWhereUniqueInput!]
  update: [BookingUpdateWithWhereUniqueWithoutBookeeInput!]
  upsert: [BookingUpsertWithWhereUniqueWithoutBookeeInput!]
}

input BookingUpdateManyWithoutPlaceInput {
  create: [BookingCreateWithoutPlaceInput!]
  connect: [BookingWhereUniqueInput!]
  disconnect: [BookingWhereUniqueInput!]
  delete: [BookingWhereUniqueInput!]
  update: [BookingUpdateWithWhereUniqueWithoutPlaceInput!]
  upsert: [BookingUpsertWithWhereUniqueWithoutPlaceInput!]
}

input BookingUpdateOneWithoutPaymentInput {
  create: BookingCreateWithoutPaymentInput
  connect: BookingWhereUniqueInput
  delete: Boolean
  update: BookingUpdateWithoutPaymentDataInput
  upsert: BookingUpsertWithoutPaymentInput
}

input BookingUpdateWithoutBookeeDataInput {
  startDate: DateTime
  endDate: DateTime
  place: PlaceUpdateOneWithoutBookingsInput
  payment: PaymentUpdateOneWithoutBookingInput
}

input BookingUpdateWithoutPaymentDataInput {
  startDate: DateTime
  endDate: DateTime
  bookee: UserUpdateOneWithoutBookingsInput
  place: PlaceUpdateOneWithoutBookingsInput
}

input BookingUpdateWithoutPlaceDataInput {
  startDate: DateTime
  endDate: DateTime
  bookee: UserUpdateOneWithoutBookingsInput
  payment: PaymentUpdateOneWithoutBookingInput
}

input BookingUpdateWithWhereUniqueWithoutBookeeInput {
  where: BookingWhereUniqueInput!
  data: BookingUpdateWithoutBookeeDataInput!
}

input BookingUpdateWithWhereUniqueWithoutPlaceInput {
  where: BookingWhereUniqueInput!
  data: BookingUpdateWithoutPlaceDataInput!
}

input BookingUpsertWithoutPaymentInput {
  update: BookingUpdateWithoutPaymentDataInput!
  create: BookingCreateWithoutPaymentInput!
}

input BookingUpsertWithWhereUniqueWithoutBookeeInput {
  where: BookingWhereUniqueInput!
  update: BookingUpdateWithoutBookeeDataInput!
  create: BookingCreateWithoutBookeeInput!
}

input BookingUpsertWithWhereUniqueWithoutPlaceInput {
  where: BookingWhereUniqueInput!
  update: BookingUpdateWithoutPlaceDataInput!
  create: BookingCreateWithoutPlaceInput!
}

input BookingWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BookingWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BookingWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  startDate: DateTime
  """
  All values that are not equal to given value.
  """
  startDate_not: DateTime
  """
  All values that are contained in given list.
  """
  startDate_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  startDate_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  startDate_lt: DateTime
  """
  All values less than or equal the given value.
  """
  startDate_lte: DateTime
  """
  All values greater than the given value.
  """
  startDate_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  startDate_gte: DateTime
  endDate: DateTime
  """
  All values that are not equal to given value.
  """
  endDate_not: DateTime
  """
  All values that are contained in given list.
  """
  endDate_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  endDate_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  endDate_lt: DateTime
  """
  All values less than or equal the given value.
  """
  endDate_lte: DateTime
  """
  All values greater than the given value.
  """
  endDate_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  endDate_gte: DateTime
  bookee: UserWhereInput
  place: PlaceWhereInput
  payment: PaymentWhereInput
}

input BookingWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type CityConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CityEdge]!
  aggregate: AggregateCity!
}

input CityCreateInput {
  name: String!
  neighbourhoods: NeighbourhoodCreateManyWithoutCityInput
}

input CityCreateOneWithoutNeighbourhoodsInput {
  create: CityCreateWithoutNeighbourhoodsInput
  connect: CityWhereUniqueInput
}

input CityCreateWithoutNeighbourhoodsInput {
  name: String!
}

"""
An edge in a connection.
"""
type CityEdge {
  """
  The item at the end of the edge.
  """
  node: City!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CityPreviousValues {
  id: ID!
  name: String!
}

type CitySubscriptionPayload {
  mutation: MutationType!
  node: City
  updatedFields: [String!]
  previousValues: CityPreviousValues
}

input CitySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CitySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CitySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CityWhereInput
}

input CityUpdateInput {
  name: String
  neighbourhoods: NeighbourhoodUpdateManyWithoutCityInput
}

input CityUpdateOneWithoutNeighbourhoodsInput {
  create: CityCreateWithoutNeighbourhoodsInput
  connect: CityWhereUniqueInput
  delete: Boolean
  update: CityUpdateWithoutNeighbourhoodsDataInput
  upsert: CityUpsertWithoutNeighbourhoodsInput
}

input CityUpdateWithoutNeighbourhoodsDataInput {
  name: String
}

input CityUpsertWithoutNeighbourhoodsInput {
  update: CityUpdateWithoutNeighbourhoodsDataInput!
  create: CityCreateWithoutNeighbourhoodsInput!
}

input CityWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CityWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CityWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  neighbourhoods_every: NeighbourhoodWhereInput
  neighbourhoods_some: NeighbourhoodWhereInput
  neighbourhoods_none: NeighbourhoodWhereInput
}

input CityWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type CreditCardInformationConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CreditCardInformationEdge]!
  aggregate: AggregateCreditCardInformation!
}

input CreditCardInformationCreateInput {
  cardNumber: String!
  expiresOnMonth: Int!
  expiresOnYear: Int!
  securityCode: String!
  firstName: String!
  lastName: String!
  postalCode: String!
  country: String!
  paymentAccount: PaymentAccountCreateOneWithoutCreditcardInput
}

input CreditCardInformationCreateOneWithoutPaymentAccountInput {
  create: CreditCardInformationCreateWithoutPaymentAccountInput
  connect: CreditCardInformationWhereUniqueInput
}

input CreditCardInformationCreateWithoutPaymentAccountInput {
  cardNumber: String!
  expiresOnMonth: Int!
  expiresOnYear: Int!
  securityCode: String!
  firstName: String!
  lastName: String!
  postalCode: String!
  country: String!
}

"""
An edge in a connection.
"""
type CreditCardInformationEdge {
  """
  The item at the end of the edge.
  """
  node: CreditCardInformation!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CreditCardInformationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  cardNumber_ASC
  cardNumber_DESC
  expiresOnMonth_ASC
  expiresOnMonth_DESC
  expiresOnYear_ASC
  expiresOnYear_DESC
  securityCode_ASC
  securityCode_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  postalCode_ASC
  postalCode_DESC
  country_ASC
  country_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CreditCardInformationPreviousValues {
  id: ID!
  createdAt: DateTime!
  cardNumber: String!
  expiresOnMonth: Int!
  expiresOnYear: Int!
  securityCode: String!
  firstName: String!
  lastName: String!
  postalCode: String!
  country: String!
}

type CreditCardInformationSubscriptionPayload {
  mutation: MutationType!
  node: CreditCardInformation
  updatedFields: [String!]
  previousValues: CreditCardInformationPreviousValues
}

input CreditCardInformationSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CreditCardInformationSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CreditCardInformationSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CreditCardInformationWhereInput
}

input CreditCardInformationUpdateInput {
  cardNumber: String
  expiresOnMonth: Int
  expiresOnYear: Int
  securityCode: String
  firstName: String
  lastName: String
  postalCode: String
  country: String
  paymentAccount: PaymentAccountUpdateOneWithoutCreditcardInput
}

input CreditCardInformationUpdateOneWithoutPaymentAccountInput {
  create: CreditCardInformationCreateWithoutPaymentAccountInput
  connect: CreditCardInformationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CreditCardInformationUpdateWithoutPaymentAccountDataInput
  upsert: CreditCardInformationUpsertWithoutPaymentAccountInput
}

input CreditCardInformationUpdateWithoutPaymentAccountDataInput {
  cardNumber: String
  expiresOnMonth: Int
  expiresOnYear: Int
  securityCode: String
  firstName: String
  lastName: String
  postalCode: String
  country: String
}

input CreditCardInformationUpsertWithoutPaymentAccountInput {
  update: CreditCardInformationUpdateWithoutPaymentAccountDataInput!
  create: CreditCardInformationCreateWithoutPaymentAccountInput!
}

input CreditCardInformationWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CreditCardInformationWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CreditCardInformationWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  cardNumber: String
  """
  All values that are not equal to given value.
  """
  cardNumber_not: String
  """
  All values that are contained in given list.
  """
  cardNumber_in: [String!]
  """
  All values that are not contained in given list.
  """
  cardNumber_not_in: [String!]
  """
  All values less than the given value.
  """
  cardNumber_lt: String
  """
  All values less than or equal the given value.
  """
  cardNumber_lte: String
  """
  All values greater than the given value.
  """
  cardNumber_gt: String
  """
  All values greater than or equal the given value.
  """
  cardNumber_gte: String
  """
  All values containing the given string.
  """
  cardNumber_contains: String
  """
  All values not containing the given string.
  """
  cardNumber_not_contains: String
  """
  All values starting with the given string.
  """
  cardNumber_starts_with: String
  """
  All values not starting with the given string.
  """
  cardNumber_not_starts_with: String
  """
  All values ending with the given string.
  """
  cardNumber_ends_with: String
  """
  All values not ending with the given string.
  """
  cardNumber_not_ends_with: String
  expiresOnMonth: Int
  """
  All values that are not equal to given value.
  """
  expiresOnMonth_not: Int
  """
  All values that are contained in given list.
  """
  expiresOnMonth_in: [Int!]
  """
  All values that are not contained in given list.
  """
  expiresOnMonth_not_in: [Int!]
  """
  All values less than the given value.
  """
  expiresOnMonth_lt: Int
  """
  All values less than or equal the given value.
  """
  expiresOnMonth_lte: Int
  """
  All values greater than the given value.
  """
  expiresOnMonth_gt: Int
  """
  All values greater than or equal the given value.
  """
  expiresOnMonth_gte: Int
  expiresOnYear: Int
  """
  All values that are not equal to given value.
  """
  expiresOnYear_not: Int
  """
  All values that are contained in given list.
  """
  expiresOnYear_in: [Int!]
  """
  All values that are not contained in given list.
  """
  expiresOnYear_not_in: [Int!]
  """
  All values less than the given value.
  """
  expiresOnYear_lt: Int
  """
  All values less than or equal the given value.
  """
  expiresOnYear_lte: Int
  """
  All values greater than the given value.
  """
  expiresOnYear_gt: Int
  """
  All values greater than or equal the given value.
  """
  expiresOnYear_gte: Int
  securityCode: String
  """
  All values that are not equal to given value.
  """
  securityCode_not: String
  """
  All values that are contained in given list.
  """
  securityCode_in: [String!]
  """
  All values that are not contained in given list.
  """
  securityCode_not_in: [String!]
  """
  All values less than the given value.
  """
  securityCode_lt: String
  """
  All values less than or equal the given value.
  """
  securityCode_lte: String
  """
  All values greater than the given value.
  """
  securityCode_gt: String
  """
  All values greater than or equal the given value.
  """
  securityCode_gte: String
  """
  All values containing the given string.
  """
  securityCode_contains: String
  """
  All values not containing the given string.
  """
  securityCode_not_contains: String
  """
  All values starting with the given string.
  """
  securityCode_starts_with: String
  """
  All values not starting with the given string.
  """
  securityCode_not_starts_with: String
  """
  All values ending with the given string.
  """
  securityCode_ends_with: String
  """
  All values not ending with the given string.
  """
  securityCode_not_ends_with: String
  firstName: String
  """
  All values that are not equal to given value.
  """
  firstName_not: String
  """
  All values that are contained in given list.
  """
  firstName_in: [String!]
  """
  All values that are not contained in given list.
  """
  firstName_not_in: [String!]
  """
  All values less than the given value.
  """
  firstName_lt: String
  """
  All values less than or equal the given value.
  """
  firstName_lte: String
  """
  All values greater than the given value.
  """
  firstName_gt: String
  """
  All values greater than or equal the given value.
  """
  firstName_gte: String
  """
  All values containing the given string.
  """
  firstName_contains: String
  """
  All values not containing the given string.
  """
  firstName_not_contains: String
  """
  All values starting with the given string.
  """
  firstName_starts_with: String
  """
  All values not starting with the given string.
  """
  firstName_not_starts_with: String
  """
  All values ending with the given string.
  """
  firstName_ends_with: String
  """
  All values not ending with the given string.
  """
  firstName_not_ends_with: String
  lastName: String
  """
  All values that are not equal to given value.
  """
  lastName_not: String
  """
  All values that are contained in given list.
  """
  lastName_in: [String!]
  """
  All values that are not contained in given list.
  """
  lastName_not_in: [String!]
  """
  All values less than the given value.
  """
  lastName_lt: String
  """
  All values less than or equal the given value.
  """
  lastName_lte: String
  """
  All values greater than the given value.
  """
  lastName_gt: String
  """
  All values greater than or equal the given value.
  """
  lastName_gte: String
  """
  All values containing the given string.
  """
  lastName_contains: String
  """
  All values not containing the given string.
  """
  lastName_not_contains: String
  """
  All values starting with the given string.
  """
  lastName_starts_with: String
  """
  All values not starting with the given string.
  """
  lastName_not_starts_with: String
  """
  All values ending with the given string.
  """
  lastName_ends_with: String
  """
  All values not ending with the given string.
  """
  lastName_not_ends_with: String
  postalCode: String
  """
  All values that are not equal to given value.
  """
  postalCode_not: String
  """
  All values that are contained in given list.
  """
  postalCode_in: [String!]
  """
  All values that are not contained in given list.
  """
  postalCode_not_in: [String!]
  """
  All values less than the given value.
  """
  postalCode_lt: String
  """
  All values less than or equal the given value.
  """
  postalCode_lte: String
  """
  All values greater than the given value.
  """
  postalCode_gt: String
  """
  All values greater than or equal the given value.
  """
  postalCode_gte: String
  """
  All values containing the given string.
  """
  postalCode_contains: String
  """
  All values not containing the given string.
  """
  postalCode_not_contains: String
  """
  All values starting with the given string.
  """
  postalCode_starts_with: String
  """
  All values not starting with the given string.
  """
  postalCode_not_starts_with: String
  """
  All values ending with the given string.
  """
  postalCode_ends_with: String
  """
  All values not ending with the given string.
  """
  postalCode_not_ends_with: String
  country: String
  """
  All values that are not equal to given value.
  """
  country_not: String
  """
  All values that are contained in given list.
  """
  country_in: [String!]
  """
  All values that are not contained in given list.
  """
  country_not_in: [String!]
  """
  All values less than the given value.
  """
  country_lt: String
  """
  All values less than or equal the given value.
  """
  country_lte: String
  """
  All values greater than the given value.
  """
  country_gt: String
  """
  All values greater than or equal the given value.
  """
  country_gte: String
  """
  All values containing the given string.
  """
  country_contains: String
  """
  All values not containing the given string.
  """
  country_not_contains: String
  """
  All values starting with the given string.
  """
  country_starts_with: String
  """
  All values not starting with the given string.
  """
  country_not_starts_with: String
  """
  All values ending with the given string.
  """
  country_ends_with: String
  """
  All values not ending with the given string.
  """
  country_not_ends_with: String
  paymentAccount: PaymentAccountWhereInput
}

input CreditCardInformationWhereUniqueInput {
  id: ID
}

enum CURRENCY {
  CAD
  CHF
  EUR
  JPY
  USD
  ZAR
}

scalar DateTime

"""
A connection to a list of items.
"""
type ExperienceCategoryConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ExperienceCategoryEdge]!
  aggregate: AggregateExperienceCategory!
}

input ExperienceCategoryCreateInput {
  mainColor: String
  name: String!
  experience: ExperienceCreateOneWithoutCategoryInput
}

input ExperienceCategoryCreateOneWithoutExperienceInput {
  create: ExperienceCategoryCreateWithoutExperienceInput
  connect: ExperienceCategoryWhereUniqueInput
}

input ExperienceCategoryCreateWithoutExperienceInput {
  mainColor: String
  name: String!
}

"""
An edge in a connection.
"""
type ExperienceCategoryEdge {
  """
  The item at the end of the edge.
  """
  node: ExperienceCategory!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ExperienceCategoryOrderByInput {
  id_ASC
  id_DESC
  mainColor_ASC
  mainColor_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ExperienceCategoryPreviousValues {
  id: ID!
  mainColor: String!
  name: String!
}

type ExperienceCategorySubscriptionPayload {
  mutation: MutationType!
  node: ExperienceCategory
  updatedFields: [String!]
  previousValues: ExperienceCategoryPreviousValues
}

input ExperienceCategorySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ExperienceCategorySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ExperienceCategorySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ExperienceCategoryWhereInput
}

input ExperienceCategoryUpdateInput {
  mainColor: String
  name: String
  experience: ExperienceUpdateOneWithoutCategoryInput
}

input ExperienceCategoryUpdateOneWithoutExperienceInput {
  create: ExperienceCategoryCreateWithoutExperienceInput
  connect: ExperienceCategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ExperienceCategoryUpdateWithoutExperienceDataInput
  upsert: ExperienceCategoryUpsertWithoutExperienceInput
}

input ExperienceCategoryUpdateWithoutExperienceDataInput {
  mainColor: String
  name: String
}

input ExperienceCategoryUpsertWithoutExperienceInput {
  update: ExperienceCategoryUpdateWithoutExperienceDataInput!
  create: ExperienceCategoryCreateWithoutExperienceInput!
}

input ExperienceCategoryWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ExperienceCategoryWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ExperienceCategoryWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  mainColor: String
  """
  All values that are not equal to given value.
  """
  mainColor_not: String
  """
  All values that are contained in given list.
  """
  mainColor_in: [String!]
  """
  All values that are not contained in given list.
  """
  mainColor_not_in: [String!]
  """
  All values less than the given value.
  """
  mainColor_lt: String
  """
  All values less than or equal the given value.
  """
  mainColor_lte: String
  """
  All values greater than the given value.
  """
  mainColor_gt: String
  """
  All values greater than or equal the given value.
  """
  mainColor_gte: String
  """
  All values containing the given string.
  """
  mainColor_contains: String
  """
  All values not containing the given string.
  """
  mainColor_not_contains: String
  """
  All values starting with the given string.
  """
  mainColor_starts_with: String
  """
  All values not starting with the given string.
  """
  mainColor_not_starts_with: String
  """
  All values ending with the given string.
  """
  mainColor_ends_with: String
  """
  All values not ending with the given string.
  """
  mainColor_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  experience: ExperienceWhereInput
}

input ExperienceCategoryWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type ExperienceConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ExperienceEdge]!
  aggregate: AggregateExperience!
}

input ExperienceCreateInput {
  title: String!
  pricePerPerson: Int!
  popularity: Int!
  category: ExperienceCategoryCreateOneWithoutExperienceInput
  host: UserCreateOneWithoutHostingExperiencesInput!
  location: LocationCreateOneWithoutExperienceInput!
  reviews: ReviewCreateManyWithoutExperienceInput
  preview: PictureCreateOneInput!
}

input ExperienceCreateManyWithoutHostInput {
  create: [ExperienceCreateWithoutHostInput!]
  connect: [ExperienceWhereUniqueInput!]
}

input ExperienceCreateOneWithoutCategoryInput {
  create: ExperienceCreateWithoutCategoryInput
  connect: ExperienceWhereUniqueInput
}

input ExperienceCreateOneWithoutLocationInput {
  create: ExperienceCreateWithoutLocationInput
  connect: ExperienceWhereUniqueInput
}

input ExperienceCreateOneWithoutReviewsInput {
  create: ExperienceCreateWithoutReviewsInput
  connect: ExperienceWhereUniqueInput
}

input ExperienceCreateWithoutCategoryInput {
  title: String!
  pricePerPerson: Int!
  popularity: Int!
  host: UserCreateOneWithoutHostingExperiencesInput!
  location: LocationCreateOneWithoutExperienceInput!
  reviews: ReviewCreateManyWithoutExperienceInput
  preview: PictureCreateOneInput!
}

input ExperienceCreateWithoutHostInput {
  title: String!
  pricePerPerson: Int!
  popularity: Int!
  category: ExperienceCategoryCreateOneWithoutExperienceInput
  location: LocationCreateOneWithoutExperienceInput!
  reviews: ReviewCreateManyWithoutExperienceInput
  preview: PictureCreateOneInput!
}

input ExperienceCreateWithoutLocationInput {
  title: String!
  pricePerPerson: Int!
  popularity: Int!
  category: ExperienceCategoryCreateOneWithoutExperienceInput
  host: UserCreateOneWithoutHostingExperiencesInput!
  reviews: ReviewCreateManyWithoutExperienceInput
  preview: PictureCreateOneInput!
}

input ExperienceCreateWithoutReviewsInput {
  title: String!
  pricePerPerson: Int!
  popularity: Int!
  category: ExperienceCategoryCreateOneWithoutExperienceInput
  host: UserCreateOneWithoutHostingExperiencesInput!
  location: LocationCreateOneWithoutExperienceInput!
  preview: PictureCreateOneInput!
}

"""
An edge in a connection.
"""
type ExperienceEdge {
  """
  The item at the end of the edge.
  """
  node: Experience!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ExperienceOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  pricePerPerson_ASC
  pricePerPerson_DESC
  popularity_ASC
  popularity_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ExperiencePreviousValues {
  id: ID!
  title: String!
  pricePerPerson: Int!
  popularity: Int!
}

type ExperienceSubscriptionPayload {
  mutation: MutationType!
  node: Experience
  updatedFields: [String!]
  previousValues: ExperiencePreviousValues
}

input ExperienceSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ExperienceSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ExperienceSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ExperienceWhereInput
}

input ExperienceUpdateInput {
  title: String
  pricePerPerson: Int
  popularity: Int
  category: ExperienceCategoryUpdateOneWithoutExperienceInput
  host: UserUpdateOneWithoutHostingExperiencesInput
  location: LocationUpdateOneWithoutExperienceInput
  reviews: ReviewUpdateManyWithoutExperienceInput
  preview: PictureUpdateOneInput
}

input ExperienceUpdateManyWithoutHostInput {
  create: [ExperienceCreateWithoutHostInput!]
  connect: [ExperienceWhereUniqueInput!]
  disconnect: [ExperienceWhereUniqueInput!]
  delete: [ExperienceWhereUniqueInput!]
  update: [ExperienceUpdateWithWhereUniqueWithoutHostInput!]
  upsert: [ExperienceUpsertWithWhereUniqueWithoutHostInput!]
}

input ExperienceUpdateOneWithoutCategoryInput {
  create: ExperienceCreateWithoutCategoryInput
  connect: ExperienceWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ExperienceUpdateWithoutCategoryDataInput
  upsert: ExperienceUpsertWithoutCategoryInput
}

input ExperienceUpdateOneWithoutLocationInput {
  create: ExperienceCreateWithoutLocationInput
  connect: ExperienceWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ExperienceUpdateWithoutLocationDataInput
  upsert: ExperienceUpsertWithoutLocationInput
}

input ExperienceUpdateOneWithoutReviewsInput {
  create: ExperienceCreateWithoutReviewsInput
  connect: ExperienceWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ExperienceUpdateWithoutReviewsDataInput
  upsert: ExperienceUpsertWithoutReviewsInput
}

input ExperienceUpdateWithoutCategoryDataInput {
  title: String
  pricePerPerson: Int
  popularity: Int
  host: UserUpdateOneWithoutHostingExperiencesInput
  location: LocationUpdateOneWithoutExperienceInput
  reviews: ReviewUpdateManyWithoutExperienceInput
  preview: PictureUpdateOneInput
}

input ExperienceUpdateWithoutHostDataInput {
  title: String
  pricePerPerson: Int
  popularity: Int
  category: ExperienceCategoryUpdateOneWithoutExperienceInput
  location: LocationUpdateOneWithoutExperienceInput
  reviews: ReviewUpdateManyWithoutExperienceInput
  preview: PictureUpdateOneInput
}

input ExperienceUpdateWithoutLocationDataInput {
  title: String
  pricePerPerson: Int
  popularity: Int
  category: ExperienceCategoryUpdateOneWithoutExperienceInput
  host: UserUpdateOneWithoutHostingExperiencesInput
  reviews: ReviewUpdateManyWithoutExperienceInput
  preview: PictureUpdateOneInput
}

input ExperienceUpdateWithoutReviewsDataInput {
  title: String
  pricePerPerson: Int
  popularity: Int
  category: ExperienceCategoryUpdateOneWithoutExperienceInput
  host: UserUpdateOneWithoutHostingExperiencesInput
  location: LocationUpdateOneWithoutExperienceInput
  preview: PictureUpdateOneInput
}

input ExperienceUpdateWithWhereUniqueWithoutHostInput {
  where: ExperienceWhereUniqueInput!
  data: ExperienceUpdateWithoutHostDataInput!
}

input ExperienceUpsertWithoutCategoryInput {
  update: ExperienceUpdateWithoutCategoryDataInput!
  create: ExperienceCreateWithoutCategoryInput!
}

input ExperienceUpsertWithoutLocationInput {
  update: ExperienceUpdateWithoutLocationDataInput!
  create: ExperienceCreateWithoutLocationInput!
}

input ExperienceUpsertWithoutReviewsInput {
  update: ExperienceUpdateWithoutReviewsDataInput!
  create: ExperienceCreateWithoutReviewsInput!
}

input ExperienceUpsertWithWhereUniqueWithoutHostInput {
  where: ExperienceWhereUniqueInput!
  update: ExperienceUpdateWithoutHostDataInput!
  create: ExperienceCreateWithoutHostInput!
}

input ExperienceWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ExperienceWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ExperienceWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  pricePerPerson: Int
  """
  All values that are not equal to given value.
  """
  pricePerPerson_not: Int
  """
  All values that are contained in given list.
  """
  pricePerPerson_in: [Int!]
  """
  All values that are not contained in given list.
  """
  pricePerPerson_not_in: [Int!]
  """
  All values less than the given value.
  """
  pricePerPerson_lt: Int
  """
  All values less than or equal the given value.
  """
  pricePerPerson_lte: Int
  """
  All values greater than the given value.
  """
  pricePerPerson_gt: Int
  """
  All values greater than or equal the given value.
  """
  pricePerPerson_gte: Int
  popularity: Int
  """
  All values that are not equal to given value.
  """
  popularity_not: Int
  """
  All values that are contained in given list.
  """
  popularity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  popularity_not_in: [Int!]
  """
  All values less than the given value.
  """
  popularity_lt: Int
  """
  All values less than or equal the given value.
  """
  popularity_lte: Int
  """
  All values greater than the given value.
  """
  popularity_gt: Int
  """
  All values greater than or equal the given value.
  """
  popularity_gte: Int
  category: ExperienceCategoryWhereInput
  host: UserWhereInput
  location: LocationWhereInput
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  preview: PictureWhereInput
}

input ExperienceWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type GuestRequirementsConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [GuestRequirementsEdge]!
  aggregate: AggregateGuestRequirements!
}

input GuestRequirementsCreateInput {
  govIssuedId: Boolean
  recommendationsFromOtherHosts: Boolean
  guestTripInformation: Boolean
  place: PlaceCreateOneWithoutGuestRequirementsInput!
}

input GuestRequirementsCreateOneWithoutPlaceInput {
  create: GuestRequirementsCreateWithoutPlaceInput
  connect: GuestRequirementsWhereUniqueInput
}

input GuestRequirementsCreateWithoutPlaceInput {
  govIssuedId: Boolean
  recommendationsFromOtherHosts: Boolean
  guestTripInformation: Boolean
}

"""
An edge in a connection.
"""
type GuestRequirementsEdge {
  """
  The item at the end of the edge.
  """
  node: GuestRequirements!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum GuestRequirementsOrderByInput {
  id_ASC
  id_DESC
  govIssuedId_ASC
  govIssuedId_DESC
  recommendationsFromOtherHosts_ASC
  recommendationsFromOtherHosts_DESC
  guestTripInformation_ASC
  guestTripInformation_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type GuestRequirementsPreviousValues {
  id: ID!
  govIssuedId: Boolean!
  recommendationsFromOtherHosts: Boolean!
  guestTripInformation: Boolean!
}

type GuestRequirementsSubscriptionPayload {
  mutation: MutationType!
  node: GuestRequirements
  updatedFields: [String!]
  previousValues: GuestRequirementsPreviousValues
}

input GuestRequirementsSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [GuestRequirementsSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [GuestRequirementsSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: GuestRequirementsWhereInput
}

input GuestRequirementsUpdateInput {
  govIssuedId: Boolean
  recommendationsFromOtherHosts: Boolean
  guestTripInformation: Boolean
  place: PlaceUpdateOneWithoutGuestRequirementsInput
}

input GuestRequirementsUpdateOneWithoutPlaceInput {
  create: GuestRequirementsCreateWithoutPlaceInput
  connect: GuestRequirementsWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: GuestRequirementsUpdateWithoutPlaceDataInput
  upsert: GuestRequirementsUpsertWithoutPlaceInput
}

input GuestRequirementsUpdateWithoutPlaceDataInput {
  govIssuedId: Boolean
  recommendationsFromOtherHosts: Boolean
  guestTripInformation: Boolean
}

input GuestRequirementsUpsertWithoutPlaceInput {
  update: GuestRequirementsUpdateWithoutPlaceDataInput!
  create: GuestRequirementsCreateWithoutPlaceInput!
}

input GuestRequirementsWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [GuestRequirementsWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [GuestRequirementsWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  govIssuedId: Boolean
  """
  All values that are not equal to given value.
  """
  govIssuedId_not: Boolean
  recommendationsFromOtherHosts: Boolean
  """
  All values that are not equal to given value.
  """
  recommendationsFromOtherHosts_not: Boolean
  guestTripInformation: Boolean
  """
  All values that are not equal to given value.
  """
  guestTripInformation_not: Boolean
  place: PlaceWhereInput
}

input GuestRequirementsWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type HouseRulesConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [HouseRulesEdge]!
  aggregate: AggregateHouseRules!
}

input HouseRulesCreateInput {
  suitableForChildren: Boolean
  suitableForInfants: Boolean
  petsAllowed: Boolean
  smokingAllowed: Boolean
  partiesAndEventsAllowed: Boolean
  additionalRules: String
}

input HouseRulesCreateOneInput {
  create: HouseRulesCreateInput
  connect: HouseRulesWhereUniqueInput
}

"""
An edge in a connection.
"""
type HouseRulesEdge {
  """
  The item at the end of the edge.
  """
  node: HouseRules!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum HouseRulesOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  suitableForChildren_ASC
  suitableForChildren_DESC
  suitableForInfants_ASC
  suitableForInfants_DESC
  petsAllowed_ASC
  petsAllowed_DESC
  smokingAllowed_ASC
  smokingAllowed_DESC
  partiesAndEventsAllowed_ASC
  partiesAndEventsAllowed_DESC
  additionalRules_ASC
  additionalRules_DESC
}

type HouseRulesPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  suitableForChildren: Boolean
  suitableForInfants: Boolean
  petsAllowed: Boolean
  smokingAllowed: Boolean
  partiesAndEventsAllowed: Boolean
  additionalRules: String
}

type HouseRulesSubscriptionPayload {
  mutation: MutationType!
  node: HouseRules
  updatedFields: [String!]
  previousValues: HouseRulesPreviousValues
}

input HouseRulesSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [HouseRulesSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [HouseRulesSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: HouseRulesWhereInput
}

input HouseRulesUpdateDataInput {
  suitableForChildren: Boolean
  suitableForInfants: Boolean
  petsAllowed: Boolean
  smokingAllowed: Boolean
  partiesAndEventsAllowed: Boolean
  additionalRules: String
}

input HouseRulesUpdateInput {
  suitableForChildren: Boolean
  suitableForInfants: Boolean
  petsAllowed: Boolean
  smokingAllowed: Boolean
  partiesAndEventsAllowed: Boolean
  additionalRules: String
}

input HouseRulesUpdateOneInput {
  create: HouseRulesCreateInput
  connect: HouseRulesWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: HouseRulesUpdateDataInput
  upsert: HouseRulesUpsertNestedInput
}

input HouseRulesUpsertNestedInput {
  update: HouseRulesUpdateDataInput!
  create: HouseRulesCreateInput!
}

input HouseRulesWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [HouseRulesWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [HouseRulesWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  suitableForChildren: Boolean
  """
  All values that are not equal to given value.
  """
  suitableForChildren_not: Boolean
  suitableForInfants: Boolean
  """
  All values that are not equal to given value.
  """
  suitableForInfants_not: Boolean
  petsAllowed: Boolean
  """
  All values that are not equal to given value.
  """
  petsAllowed_not: Boolean
  smokingAllowed: Boolean
  """
  All values that are not equal to given value.
  """
  smokingAllowed_not: Boolean
  partiesAndEventsAllowed: Boolean
  """
  All values that are not equal to given value.
  """
  partiesAndEventsAllowed_not: Boolean
  additionalRules: String
  """
  All values that are not equal to given value.
  """
  additionalRules_not: String
  """
  All values that are contained in given list.
  """
  additionalRules_in: [String!]
  """
  All values that are not contained in given list.
  """
  additionalRules_not_in: [String!]
  """
  All values less than the given value.
  """
  additionalRules_lt: String
  """
  All values less than or equal the given value.
  """
  additionalRules_lte: String
  """
  All values greater than the given value.
  """
  additionalRules_gt: String
  """
  All values greater than or equal the given value.
  """
  additionalRules_gte: String
  """
  All values containing the given string.
  """
  additionalRules_contains: String
  """
  All values not containing the given string.
  """
  additionalRules_not_contains: String
  """
  All values starting with the given string.
  """
  additionalRules_starts_with: String
  """
  All values not starting with the given string.
  """
  additionalRules_not_starts_with: String
  """
  All values ending with the given string.
  """
  additionalRules_ends_with: String
  """
  All values not ending with the given string.
  """
  additionalRules_not_ends_with: String
}

input HouseRulesWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type LocationConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [LocationEdge]!
  aggregate: AggregateLocation!
}

input LocationCreateInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  neighbourHood: NeighbourhoodCreateOneWithoutLocationsInput
  user: UserCreateOneWithoutLocationInput
  place: PlaceCreateOneWithoutLocationInput
  experience: ExperienceCreateOneWithoutLocationInput
  restaurant: RestaurantCreateOneWithoutLocationInput
}

input LocationCreateManyWithoutNeighbourHoodInput {
  create: [LocationCreateWithoutNeighbourHoodInput!]
  connect: [LocationWhereUniqueInput!]
}

input LocationCreateOneWithoutExperienceInput {
  create: LocationCreateWithoutExperienceInput
  connect: LocationWhereUniqueInput
}

input LocationCreateOneWithoutPlaceInput {
  create: LocationCreateWithoutPlaceInput
  connect: LocationWhereUniqueInput
}

input LocationCreateOneWithoutRestaurantInput {
  create: LocationCreateWithoutRestaurantInput
  connect: LocationWhereUniqueInput
}

input LocationCreateOneWithoutUserInput {
  create: LocationCreateWithoutUserInput
  connect: LocationWhereUniqueInput
}

input LocationCreateWithoutExperienceInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  neighbourHood: NeighbourhoodCreateOneWithoutLocationsInput
  user: UserCreateOneWithoutLocationInput
  place: PlaceCreateOneWithoutLocationInput
  restaurant: RestaurantCreateOneWithoutLocationInput
}

input LocationCreateWithoutNeighbourHoodInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  user: UserCreateOneWithoutLocationInput
  place: PlaceCreateOneWithoutLocationInput
  experience: ExperienceCreateOneWithoutLocationInput
  restaurant: RestaurantCreateOneWithoutLocationInput
}

input LocationCreateWithoutPlaceInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  neighbourHood: NeighbourhoodCreateOneWithoutLocationsInput
  user: UserCreateOneWithoutLocationInput
  experience: ExperienceCreateOneWithoutLocationInput
  restaurant: RestaurantCreateOneWithoutLocationInput
}

input LocationCreateWithoutRestaurantInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  neighbourHood: NeighbourhoodCreateOneWithoutLocationsInput
  user: UserCreateOneWithoutLocationInput
  place: PlaceCreateOneWithoutLocationInput
  experience: ExperienceCreateOneWithoutLocationInput
}

input LocationCreateWithoutUserInput {
  lat: Float!
  lng: Float!
  address: String
  directions: String
  neighbourHood: NeighbourhoodCreateOneWithoutLocationsInput
  place: PlaceCreateOneWithoutLocationInput
  experience: ExperienceCreateOneWithoutLocationInput
  restaurant: RestaurantCreateOneWithoutLocationInput
}

"""
An edge in a connection.
"""
type LocationEdge {
  """
  The item at the end of the edge.
  """
  node: Location!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum LocationOrderByInput {
  id_ASC
  id_DESC
  lat_ASC
  lat_DESC
  lng_ASC
  lng_DESC
  address_ASC
  address_DESC
  directions_ASC
  directions_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type LocationPreviousValues {
  id: ID!
  lat: Float!
  lng: Float!
  address: String
  directions: String
}

type LocationSubscriptionPayload {
  mutation: MutationType!
  node: Location
  updatedFields: [String!]
  previousValues: LocationPreviousValues
}

input LocationSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LocationSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LocationSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: LocationWhereInput
}

input LocationUpdateInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  neighbourHood: NeighbourhoodUpdateOneWithoutLocationsInput
  user: UserUpdateOneWithoutLocationInput
  place: PlaceUpdateOneWithoutLocationInput
  experience: ExperienceUpdateOneWithoutLocationInput
  restaurant: RestaurantUpdateOneWithoutLocationInput
}

input LocationUpdateManyWithoutNeighbourHoodInput {
  create: [LocationCreateWithoutNeighbourHoodInput!]
  connect: [LocationWhereUniqueInput!]
  disconnect: [LocationWhereUniqueInput!]
  delete: [LocationWhereUniqueInput!]
  update: [LocationUpdateWithWhereUniqueWithoutNeighbourHoodInput!]
  upsert: [LocationUpsertWithWhereUniqueWithoutNeighbourHoodInput!]
}

input LocationUpdateOneWithoutExperienceInput {
  create: LocationCreateWithoutExperienceInput
  connect: LocationWhereUniqueInput
  delete: Boolean
  update: LocationUpdateWithoutExperienceDataInput
  upsert: LocationUpsertWithoutExperienceInput
}

input LocationUpdateOneWithoutPlaceInput {
  create: LocationCreateWithoutPlaceInput
  connect: LocationWhereUniqueInput
  delete: Boolean
  update: LocationUpdateWithoutPlaceDataInput
  upsert: LocationUpsertWithoutPlaceInput
}

input LocationUpdateOneWithoutRestaurantInput {
  create: LocationCreateWithoutRestaurantInput
  connect: LocationWhereUniqueInput
  delete: Boolean
  update: LocationUpdateWithoutRestaurantDataInput
  upsert: LocationUpsertWithoutRestaurantInput
}

input LocationUpdateOneWithoutUserInput {
  create: LocationCreateWithoutUserInput
  connect: LocationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: LocationUpdateWithoutUserDataInput
  upsert: LocationUpsertWithoutUserInput
}

input LocationUpdateWithoutExperienceDataInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  neighbourHood: NeighbourhoodUpdateOneWithoutLocationsInput
  user: UserUpdateOneWithoutLocationInput
  place: PlaceUpdateOneWithoutLocationInput
  restaurant: RestaurantUpdateOneWithoutLocationInput
}

input LocationUpdateWithoutNeighbourHoodDataInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  user: UserUpdateOneWithoutLocationInput
  place: PlaceUpdateOneWithoutLocationInput
  experience: ExperienceUpdateOneWithoutLocationInput
  restaurant: RestaurantUpdateOneWithoutLocationInput
}

input LocationUpdateWithoutPlaceDataInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  neighbourHood: NeighbourhoodUpdateOneWithoutLocationsInput
  user: UserUpdateOneWithoutLocationInput
  experience: ExperienceUpdateOneWithoutLocationInput
  restaurant: RestaurantUpdateOneWithoutLocationInput
}

input LocationUpdateWithoutRestaurantDataInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  neighbourHood: NeighbourhoodUpdateOneWithoutLocationsInput
  user: UserUpdateOneWithoutLocationInput
  place: PlaceUpdateOneWithoutLocationInput
  experience: ExperienceUpdateOneWithoutLocationInput
}

input LocationUpdateWithoutUserDataInput {
  lat: Float
  lng: Float
  address: String
  directions: String
  neighbourHood: NeighbourhoodUpdateOneWithoutLocationsInput
  place: PlaceUpdateOneWithoutLocationInput
  experience: ExperienceUpdateOneWithoutLocationInput
  restaurant: RestaurantUpdateOneWithoutLocationInput
}

input LocationUpdateWithWhereUniqueWithoutNeighbourHoodInput {
  where: LocationWhereUniqueInput!
  data: LocationUpdateWithoutNeighbourHoodDataInput!
}

input LocationUpsertWithoutExperienceInput {
  update: LocationUpdateWithoutExperienceDataInput!
  create: LocationCreateWithoutExperienceInput!
}

input LocationUpsertWithoutPlaceInput {
  update: LocationUpdateWithoutPlaceDataInput!
  create: LocationCreateWithoutPlaceInput!
}

input LocationUpsertWithoutRestaurantInput {
  update: LocationUpdateWithoutRestaurantDataInput!
  create: LocationCreateWithoutRestaurantInput!
}

input LocationUpsertWithoutUserInput {
  update: LocationUpdateWithoutUserDataInput!
  create: LocationCreateWithoutUserInput!
}

input LocationUpsertWithWhereUniqueWithoutNeighbourHoodInput {
  where: LocationWhereUniqueInput!
  update: LocationUpdateWithoutNeighbourHoodDataInput!
  create: LocationCreateWithoutNeighbourHoodInput!
}

input LocationWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [LocationWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [LocationWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  lat: Float
  """
  All values that are not equal to given value.
  """
  lat_not: Float
  """
  All values that are contained in given list.
  """
  lat_in: [Float!]
  """
  All values that are not contained in given list.
  """
  lat_not_in: [Float!]
  """
  All values less than the given value.
  """
  lat_lt: Float
  """
  All values less than or equal the given value.
  """
  lat_lte: Float
  """
  All values greater than the given value.
  """
  lat_gt: Float
  """
  All values greater than or equal the given value.
  """
  lat_gte: Float
  lng: Float
  """
  All values that are not equal to given value.
  """
  lng_not: Float
  """
  All values that are contained in given list.
  """
  lng_in: [Float!]
  """
  All values that are not contained in given list.
  """
  lng_not_in: [Float!]
  """
  All values less than the given value.
  """
  lng_lt: Float
  """
  All values less than or equal the given value.
  """
  lng_lte: Float
  """
  All values greater than the given value.
  """
  lng_gt: Float
  """
  All values greater than or equal the given value.
  """
  lng_gte: Float
  address: String
  """
  All values that are not equal to given value.
  """
  address_not: String
  """
  All values that are contained in given list.
  """
  address_in: [String!]
  """
  All values that are not contained in given list.
  """
  address_not_in: [String!]
  """
  All values less than the given value.
  """
  address_lt: String
  """
  All values less than or equal the given value.
  """
  address_lte: String
  """
  All values greater than the given value.
  """
  address_gt: String
  """
  All values greater than or equal the given value.
  """
  address_gte: String
  """
  All values containing the given string.
  """
  address_contains: String
  """
  All values not containing the given string.
  """
  address_not_contains: String
  """
  All values starting with the given string.
  """
  address_starts_with: String
  """
  All values not starting with the given string.
  """
  address_not_starts_with: String
  """
  All values ending with the given string.
  """
  address_ends_with: String
  """
  All values not ending with the given string.
  """
  address_not_ends_with: String
  directions: String
  """
  All values that are not equal to given value.
  """
  directions_not: String
  """
  All values that are contained in given list.
  """
  directions_in: [String!]
  """
  All values that are not contained in given list.
  """
  directions_not_in: [String!]
  """
  All values less than the given value.
  """
  directions_lt: String
  """
  All values less than or equal the given value.
  """
  directions_lte: String
  """
  All values greater than the given value.
  """
  directions_gt: String
  """
  All values greater than or equal the given value.
  """
  directions_gte: String
  """
  All values containing the given string.
  """
  directions_contains: String
  """
  All values not containing the given string.
  """
  directions_not_contains: String
  """
  All values starting with the given string.
  """
  directions_starts_with: String
  """
  All values not starting with the given string.
  """
  directions_not_starts_with: String
  """
  All values ending with the given string.
  """
  directions_ends_with: String
  """
  All values not ending with the given string.
  """
  directions_not_ends_with: String
  neighbourHood: NeighbourhoodWhereInput
  user: UserWhereInput
  place: PlaceWhereInput
  experience: ExperienceWhereInput
  restaurant: RestaurantWhereInput
}

input LocationWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

"""
A connection to a list of items.
"""
type MessageConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  deliveredAt: DateTime!
  readAt: DateTime!
  from: UserCreateOneWithoutSentMessagesInput!
  to: UserCreateOneWithoutReceivedMessagesInput!
}

input MessageCreateManyWithoutFromInput {
  create: [MessageCreateWithoutFromInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateManyWithoutToInput {
  create: [MessageCreateWithoutToInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateWithoutFromInput {
  deliveredAt: DateTime!
  readAt: DateTime!
  to: UserCreateOneWithoutReceivedMessagesInput!
}

input MessageCreateWithoutToInput {
  deliveredAt: DateTime!
  readAt: DateTime!
  from: UserCreateOneWithoutSentMessagesInput!
}

"""
An edge in a connection.
"""
type MessageEdge {
  """
  The item at the end of the edge.
  """
  node: Message!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  deliveredAt_ASC
  deliveredAt_DESC
  readAt_ASC
  readAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MessagePreviousValues {
  id: ID!
  createdAt: DateTime!
  deliveredAt: DateTime!
  readAt: DateTime!
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [MessageSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [MessageSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
}

input MessageUpdateInput {
  deliveredAt: DateTime
  readAt: DateTime
  from: UserUpdateOneWithoutSentMessagesInput
  to: UserUpdateOneWithoutReceivedMessagesInput
}

input MessageUpdateManyWithoutFromInput {
  create: [MessageCreateWithoutFromInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  delete: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutFromInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutFromInput!]
}

input MessageUpdateManyWithoutToInput {
  create: [MessageCreateWithoutToInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  delete: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutToInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutToInput!]
}

input MessageUpdateWithoutFromDataInput {
  deliveredAt: DateTime
  readAt: DateTime
  to: UserUpdateOneWithoutReceivedMessagesInput
}

input MessageUpdateWithoutToDataInput {
  deliveredAt: DateTime
  readAt: DateTime
  from: UserUpdateOneWithoutSentMessagesInput
}

input MessageUpdateWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutFromDataInput!
}

input MessageUpdateWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutToDataInput!
}

input MessageUpsertWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutFromDataInput!
  create: MessageCreateWithoutFromInput!
}

input MessageUpsertWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutToDataInput!
  create: MessageCreateWithoutToInput!
}

input MessageWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [MessageWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [MessageWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  deliveredAt: DateTime
  """
  All values that are not equal to given value.
  """
  deliveredAt_not: DateTime
  """
  All values that are contained in given list.
  """
  deliveredAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  deliveredAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  deliveredAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  deliveredAt_lte: DateTime
  """
  All values greater than the given value.
  """
  deliveredAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  deliveredAt_gte: DateTime
  readAt: DateTime
  """
  All values that are not equal to given value.
  """
  readAt_not: DateTime
  """
  All values that are contained in given list.
  """
  readAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  readAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  readAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  readAt_lte: DateTime
  """
  All values greater than the given value.
  """
  readAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  readAt_gte: DateTime
  from: UserWhereInput
  to: UserWhereInput
}

input MessageWhereUniqueInput {
  id: ID
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
A connection to a list of items.
"""
type NeighbourhoodConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [NeighbourhoodEdge]!
  aggregate: AggregateNeighbourhood!
}

input NeighbourhoodCreateInput {
  name: String!
  slug: String!
  featured: Boolean!
  popularity: Int!
  locations: LocationCreateManyWithoutNeighbourHoodInput
  homePreview: PictureCreateOneInput
  city: CityCreateOneWithoutNeighbourhoodsInput!
}

input NeighbourhoodCreateManyWithoutCityInput {
  create: [NeighbourhoodCreateWithoutCityInput!]
  connect: [NeighbourhoodWhereUniqueInput!]
}

input NeighbourhoodCreateOneWithoutLocationsInput {
  create: NeighbourhoodCreateWithoutLocationsInput
  connect: NeighbourhoodWhereUniqueInput
}

input NeighbourhoodCreateWithoutCityInput {
  name: String!
  slug: String!
  featured: Boolean!
  popularity: Int!
  locations: LocationCreateManyWithoutNeighbourHoodInput
  homePreview: PictureCreateOneInput
}

input NeighbourhoodCreateWithoutLocationsInput {
  name: String!
  slug: String!
  featured: Boolean!
  popularity: Int!
  homePreview: PictureCreateOneInput
  city: CityCreateOneWithoutNeighbourhoodsInput!
}

"""
An edge in a connection.
"""
type NeighbourhoodEdge {
  """
  The item at the end of the edge.
  """
  node: Neighbourhood!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum NeighbourhoodOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  slug_ASC
  slug_DESC
  featured_ASC
  featured_DESC
  popularity_ASC
  popularity_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type NeighbourhoodPreviousValues {
  id: ID!
  name: String!
  slug: String!
  featured: Boolean!
  popularity: Int!
}

type NeighbourhoodSubscriptionPayload {
  mutation: MutationType!
  node: Neighbourhood
  updatedFields: [String!]
  previousValues: NeighbourhoodPreviousValues
}

input NeighbourhoodSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NeighbourhoodSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NeighbourhoodSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: NeighbourhoodWhereInput
}

input NeighbourhoodUpdateInput {
  name: String
  slug: String
  featured: Boolean
  popularity: Int
  locations: LocationUpdateManyWithoutNeighbourHoodInput
  homePreview: PictureUpdateOneInput
  city: CityUpdateOneWithoutNeighbourhoodsInput
}

input NeighbourhoodUpdateManyWithoutCityInput {
  create: [NeighbourhoodCreateWithoutCityInput!]
  connect: [NeighbourhoodWhereUniqueInput!]
  disconnect: [NeighbourhoodWhereUniqueInput!]
  delete: [NeighbourhoodWhereUniqueInput!]
  update: [NeighbourhoodUpdateWithWhereUniqueWithoutCityInput!]
  upsert: [NeighbourhoodUpsertWithWhereUniqueWithoutCityInput!]
}

input NeighbourhoodUpdateOneWithoutLocationsInput {
  create: NeighbourhoodCreateWithoutLocationsInput
  connect: NeighbourhoodWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: NeighbourhoodUpdateWithoutLocationsDataInput
  upsert: NeighbourhoodUpsertWithoutLocationsInput
}

input NeighbourhoodUpdateWithoutCityDataInput {
  name: String
  slug: String
  featured: Boolean
  popularity: Int
  locations: LocationUpdateManyWithoutNeighbourHoodInput
  homePreview: PictureUpdateOneInput
}

input NeighbourhoodUpdateWithoutLocationsDataInput {
  name: String
  slug: String
  featured: Boolean
  popularity: Int
  homePreview: PictureUpdateOneInput
  city: CityUpdateOneWithoutNeighbourhoodsInput
}

input NeighbourhoodUpdateWithWhereUniqueWithoutCityInput {
  where: NeighbourhoodWhereUniqueInput!
  data: NeighbourhoodUpdateWithoutCityDataInput!
}

input NeighbourhoodUpsertWithoutLocationsInput {
  update: NeighbourhoodUpdateWithoutLocationsDataInput!
  create: NeighbourhoodCreateWithoutLocationsInput!
}

input NeighbourhoodUpsertWithWhereUniqueWithoutCityInput {
  where: NeighbourhoodWhereUniqueInput!
  update: NeighbourhoodUpdateWithoutCityDataInput!
  create: NeighbourhoodCreateWithoutCityInput!
}

input NeighbourhoodWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NeighbourhoodWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NeighbourhoodWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  slug: String
  """
  All values that are not equal to given value.
  """
  slug_not: String
  """
  All values that are contained in given list.
  """
  slug_in: [String!]
  """
  All values that are not contained in given list.
  """
  slug_not_in: [String!]
  """
  All values less than the given value.
  """
  slug_lt: String
  """
  All values less than or equal the given value.
  """
  slug_lte: String
  """
  All values greater than the given value.
  """
  slug_gt: String
  """
  All values greater than or equal the given value.
  """
  slug_gte: String
  """
  All values containing the given string.
  """
  slug_contains: String
  """
  All values not containing the given string.
  """
  slug_not_contains: String
  """
  All values starting with the given string.
  """
  slug_starts_with: String
  """
  All values not starting with the given string.
  """
  slug_not_starts_with: String
  """
  All values ending with the given string.
  """
  slug_ends_with: String
  """
  All values not ending with the given string.
  """
  slug_not_ends_with: String
  featured: Boolean
  """
  All values that are not equal to given value.
  """
  featured_not: Boolean
  popularity: Int
  """
  All values that are not equal to given value.
  """
  popularity_not: Int
  """
  All values that are contained in given list.
  """
  popularity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  popularity_not_in: [Int!]
  """
  All values less than the given value.
  """
  popularity_lt: Int
  """
  All values less than or equal the given value.
  """
  popularity_lte: Int
  """
  All values greater than the given value.
  """
  popularity_gt: Int
  """
  All values greater than or equal the given value.
  """
  popularity_gte: Int
  locations_every: LocationWhereInput
  locations_some: LocationWhereInput
  locations_none: LocationWhereInput
  homePreview: PictureWhereInput
  city: CityWhereInput
}

input NeighbourhoodWhereUniqueInput {
  id: ID
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

enum NOTIFICATION_TYPE {
  OFFER
  INSTANT_BOOK
  RESPONSIVENESS
  NEW_AMENITIES
  HOUSE_RULES
}

"""
A connection to a list of items.
"""
type NotificationConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [NotificationEdge]!
  aggregate: AggregateNotification!
}

input NotificationCreateInput {
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime!
  user: UserCreateOneWithoutNotificationsInput!
}

input NotificationCreateManyWithoutUserInput {
  create: [NotificationCreateWithoutUserInput!]
  connect: [NotificationWhereUniqueInput!]
}

input NotificationCreateWithoutUserInput {
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime!
}

"""
An edge in a connection.
"""
type NotificationEdge {
  """
  The item at the end of the edge.
  """
  node: Notification!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum NotificationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  type_ASC
  type_DESC
  link_ASC
  link_DESC
  readDate_ASC
  readDate_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type NotificationPreviousValues {
  id: ID!
  createdAt: DateTime!
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime!
}

type NotificationSubscriptionPayload {
  mutation: MutationType!
  node: Notification
  updatedFields: [String!]
  previousValues: NotificationPreviousValues
}

input NotificationSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NotificationSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NotificationSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: NotificationWhereInput
}

input NotificationUpdateInput {
  type: NOTIFICATION_TYPE
  link: String
  readDate: DateTime
  user: UserUpdateOneWithoutNotificationsInput
}

input NotificationUpdateManyWithoutUserInput {
  create: [NotificationCreateWithoutUserInput!]
  connect: [NotificationWhereUniqueInput!]
  disconnect: [NotificationWhereUniqueInput!]
  delete: [NotificationWhereUniqueInput!]
  update: [NotificationUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [NotificationUpsertWithWhereUniqueWithoutUserInput!]
}

input NotificationUpdateWithoutUserDataInput {
  type: NOTIFICATION_TYPE
  link: String
  readDate: DateTime
}

input NotificationUpdateWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput!
  data: NotificationUpdateWithoutUserDataInput!
}

input NotificationUpsertWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput!
  update: NotificationUpdateWithoutUserDataInput!
  create: NotificationCreateWithoutUserInput!
}

input NotificationWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [NotificationWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [NotificationWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  type: NOTIFICATION_TYPE
  """
  All values that are not equal to given value.
  """
  type_not: NOTIFICATION_TYPE
  """
  All values that are contained in given list.
  """
  type_in: [NOTIFICATION_TYPE!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [NOTIFICATION_TYPE!]
  link: String
  """
  All values that are not equal to given value.
  """
  link_not: String
  """
  All values that are contained in given list.
  """
  link_in: [String!]
  """
  All values that are not contained in given list.
  """
  link_not_in: [String!]
  """
  All values less than the given value.
  """
  link_lt: String
  """
  All values less than or equal the given value.
  """
  link_lte: String
  """
  All values greater than the given value.
  """
  link_gt: String
  """
  All values greater than or equal the given value.
  """
  link_gte: String
  """
  All values containing the given string.
  """
  link_contains: String
  """
  All values not containing the given string.
  """
  link_not_contains: String
  """
  All values starting with the given string.
  """
  link_starts_with: String
  """
  All values not starting with the given string.
  """
  link_not_starts_with: String
  """
  All values ending with the given string.
  """
  link_ends_with: String
  """
  All values not ending with the given string.
  """
  link_not_ends_with: String
  readDate: DateTime
  """
  All values that are not equal to given value.
  """
  readDate_not: DateTime
  """
  All values that are contained in given list.
  """
  readDate_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  readDate_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  readDate_lt: DateTime
  """
  All values less than or equal the given value.
  """
  readDate_lte: DateTime
  """
  All values greater than the given value.
  """
  readDate_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  readDate_gte: DateTime
  user: UserWhereInput
}

input NotificationWhereUniqueInput {
  id: ID
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

enum PAYMENT_PROVIDER {
  PAYPAL
  CREDIT_CARD
}

"""
A connection to a list of items.
"""
type PaymentAccountConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PaymentAccountEdge]!
  aggregate: AggregatePaymentAccount!
}

input PaymentAccountCreateInput {
  type: PAYMENT_PROVIDER
  user: UserCreateOneWithoutPaymentAccountInput!
  payments: PaymentCreateManyWithoutPaymentMethodInput
  paypal: PaypalInformationCreateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationCreateOneWithoutPaymentAccountInput
}

input PaymentAccountCreateManyWithoutUserInput {
  create: [PaymentAccountCreateWithoutUserInput!]
  connect: [PaymentAccountWhereUniqueInput!]
}

input PaymentAccountCreateOneWithoutCreditcardInput {
  create: PaymentAccountCreateWithoutCreditcardInput
  connect: PaymentAccountWhereUniqueInput
}

input PaymentAccountCreateOneWithoutPaymentsInput {
  create: PaymentAccountCreateWithoutPaymentsInput
  connect: PaymentAccountWhereUniqueInput
}

input PaymentAccountCreateOneWithoutPaypalInput {
  create: PaymentAccountCreateWithoutPaypalInput
  connect: PaymentAccountWhereUniqueInput
}

input PaymentAccountCreateWithoutCreditcardInput {
  type: PAYMENT_PROVIDER
  user: UserCreateOneWithoutPaymentAccountInput!
  payments: PaymentCreateManyWithoutPaymentMethodInput
  paypal: PaypalInformationCreateOneWithoutPaymentAccountInput
}

input PaymentAccountCreateWithoutPaymentsInput {
  type: PAYMENT_PROVIDER
  user: UserCreateOneWithoutPaymentAccountInput!
  paypal: PaypalInformationCreateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationCreateOneWithoutPaymentAccountInput
}

input PaymentAccountCreateWithoutPaypalInput {
  type: PAYMENT_PROVIDER
  user: UserCreateOneWithoutPaymentAccountInput!
  payments: PaymentCreateManyWithoutPaymentMethodInput
  creditcard: CreditCardInformationCreateOneWithoutPaymentAccountInput
}

input PaymentAccountCreateWithoutUserInput {
  type: PAYMENT_PROVIDER
  payments: PaymentCreateManyWithoutPaymentMethodInput
  paypal: PaypalInformationCreateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationCreateOneWithoutPaymentAccountInput
}

"""
An edge in a connection.
"""
type PaymentAccountEdge {
  """
  The item at the end of the edge.
  """
  node: PaymentAccount!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PaymentAccountOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PaymentAccountPreviousValues {
  id: ID!
  createdAt: DateTime!
  type: PAYMENT_PROVIDER
}

type PaymentAccountSubscriptionPayload {
  mutation: MutationType!
  node: PaymentAccount
  updatedFields: [String!]
  previousValues: PaymentAccountPreviousValues
}

input PaymentAccountSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaymentAccountSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaymentAccountSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PaymentAccountWhereInput
}

input PaymentAccountUpdateInput {
  type: PAYMENT_PROVIDER
  user: UserUpdateOneWithoutPaymentAccountInput
  payments: PaymentUpdateManyWithoutPaymentMethodInput
  paypal: PaypalInformationUpdateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationUpdateOneWithoutPaymentAccountInput
}

input PaymentAccountUpdateManyWithoutUserInput {
  create: [PaymentAccountCreateWithoutUserInput!]
  connect: [PaymentAccountWhereUniqueInput!]
  disconnect: [PaymentAccountWhereUniqueInput!]
  delete: [PaymentAccountWhereUniqueInput!]
  update: [PaymentAccountUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [PaymentAccountUpsertWithWhereUniqueWithoutUserInput!]
}

input PaymentAccountUpdateOneWithoutCreditcardInput {
  create: PaymentAccountCreateWithoutCreditcardInput
  connect: PaymentAccountWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PaymentAccountUpdateWithoutCreditcardDataInput
  upsert: PaymentAccountUpsertWithoutCreditcardInput
}

input PaymentAccountUpdateOneWithoutPaymentsInput {
  create: PaymentAccountCreateWithoutPaymentsInput
  connect: PaymentAccountWhereUniqueInput
  delete: Boolean
  update: PaymentAccountUpdateWithoutPaymentsDataInput
  upsert: PaymentAccountUpsertWithoutPaymentsInput
}

input PaymentAccountUpdateOneWithoutPaypalInput {
  create: PaymentAccountCreateWithoutPaypalInput
  connect: PaymentAccountWhereUniqueInput
  delete: Boolean
  update: PaymentAccountUpdateWithoutPaypalDataInput
  upsert: PaymentAccountUpsertWithoutPaypalInput
}

input PaymentAccountUpdateWithoutCreditcardDataInput {
  type: PAYMENT_PROVIDER
  user: UserUpdateOneWithoutPaymentAccountInput
  payments: PaymentUpdateManyWithoutPaymentMethodInput
  paypal: PaypalInformationUpdateOneWithoutPaymentAccountInput
}

input PaymentAccountUpdateWithoutPaymentsDataInput {
  type: PAYMENT_PROVIDER
  user: UserUpdateOneWithoutPaymentAccountInput
  paypal: PaypalInformationUpdateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationUpdateOneWithoutPaymentAccountInput
}

input PaymentAccountUpdateWithoutPaypalDataInput {
  type: PAYMENT_PROVIDER
  user: UserUpdateOneWithoutPaymentAccountInput
  payments: PaymentUpdateManyWithoutPaymentMethodInput
  creditcard: CreditCardInformationUpdateOneWithoutPaymentAccountInput
}

input PaymentAccountUpdateWithoutUserDataInput {
  type: PAYMENT_PROVIDER
  payments: PaymentUpdateManyWithoutPaymentMethodInput
  paypal: PaypalInformationUpdateOneWithoutPaymentAccountInput
  creditcard: CreditCardInformationUpdateOneWithoutPaymentAccountInput
}

input PaymentAccountUpdateWithWhereUniqueWithoutUserInput {
  where: PaymentAccountWhereUniqueInput!
  data: PaymentAccountUpdateWithoutUserDataInput!
}

input PaymentAccountUpsertWithoutCreditcardInput {
  update: PaymentAccountUpdateWithoutCreditcardDataInput!
  create: PaymentAccountCreateWithoutCreditcardInput!
}

input PaymentAccountUpsertWithoutPaymentsInput {
  update: PaymentAccountUpdateWithoutPaymentsDataInput!
  create: PaymentAccountCreateWithoutPaymentsInput!
}

input PaymentAccountUpsertWithoutPaypalInput {
  update: PaymentAccountUpdateWithoutPaypalDataInput!
  create: PaymentAccountCreateWithoutPaypalInput!
}

input PaymentAccountUpsertWithWhereUniqueWithoutUserInput {
  where: PaymentAccountWhereUniqueInput!
  update: PaymentAccountUpdateWithoutUserDataInput!
  create: PaymentAccountCreateWithoutUserInput!
}

input PaymentAccountWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaymentAccountWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaymentAccountWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  type: PAYMENT_PROVIDER
  """
  All values that are not equal to given value.
  """
  type_not: PAYMENT_PROVIDER
  """
  All values that are contained in given list.
  """
  type_in: [PAYMENT_PROVIDER!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [PAYMENT_PROVIDER!]
  user: UserWhereInput
  payments_every: PaymentWhereInput
  payments_some: PaymentWhereInput
  payments_none: PaymentWhereInput
  paypal: PaypalInformationWhereInput
  creditcard: CreditCardInformationWhereInput
}

input PaymentAccountWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type PaymentConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PaymentEdge]!
  aggregate: AggregatePayment!
}

input PaymentCreateInput {
  serviceFee: Float!
  placePrice: Float!
  totalPrice: Float!
  booking: BookingCreateOneWithoutPaymentInput!
  paymentMethod: PaymentAccountCreateOneWithoutPaymentsInput!
}

input PaymentCreateManyWithoutPaymentMethodInput {
  create: [PaymentCreateWithoutPaymentMethodInput!]
  connect: [PaymentWhereUniqueInput!]
}

input PaymentCreateOneWithoutBookingInput {
  create: PaymentCreateWithoutBookingInput
  connect: PaymentWhereUniqueInput
}

input PaymentCreateWithoutBookingInput {
  serviceFee: Float!
  placePrice: Float!
  totalPrice: Float!
  paymentMethod: PaymentAccountCreateOneWithoutPaymentsInput!
}

input PaymentCreateWithoutPaymentMethodInput {
  serviceFee: Float!
  placePrice: Float!
  totalPrice: Float!
  booking: BookingCreateOneWithoutPaymentInput!
}

"""
An edge in a connection.
"""
type PaymentEdge {
  """
  The item at the end of the edge.
  """
  node: Payment!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PaymentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  serviceFee_ASC
  serviceFee_DESC
  placePrice_ASC
  placePrice_DESC
  totalPrice_ASC
  totalPrice_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PaymentPreviousValues {
  id: ID!
  createdAt: DateTime!
  serviceFee: Float!
  placePrice: Float!
  totalPrice: Float!
}

type PaymentSubscriptionPayload {
  mutation: MutationType!
  node: Payment
  updatedFields: [String!]
  previousValues: PaymentPreviousValues
}

input PaymentSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaymentSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaymentSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PaymentWhereInput
}

input PaymentUpdateInput {
  serviceFee: Float
  placePrice: Float
  totalPrice: Float
  booking: BookingUpdateOneWithoutPaymentInput
  paymentMethod: PaymentAccountUpdateOneWithoutPaymentsInput
}

input PaymentUpdateManyWithoutPaymentMethodInput {
  create: [PaymentCreateWithoutPaymentMethodInput!]
  connect: [PaymentWhereUniqueInput!]
  disconnect: [PaymentWhereUniqueInput!]
  delete: [PaymentWhereUniqueInput!]
  update: [PaymentUpdateWithWhereUniqueWithoutPaymentMethodInput!]
  upsert: [PaymentUpsertWithWhereUniqueWithoutPaymentMethodInput!]
}

input PaymentUpdateOneWithoutBookingInput {
  create: PaymentCreateWithoutBookingInput
  connect: PaymentWhereUniqueInput
  delete: Boolean
  update: PaymentUpdateWithoutBookingDataInput
  upsert: PaymentUpsertWithoutBookingInput
}

input PaymentUpdateWithoutBookingDataInput {
  serviceFee: Float
  placePrice: Float
  totalPrice: Float
  paymentMethod: PaymentAccountUpdateOneWithoutPaymentsInput
}

input PaymentUpdateWithoutPaymentMethodDataInput {
  serviceFee: Float
  placePrice: Float
  totalPrice: Float
  booking: BookingUpdateOneWithoutPaymentInput
}

input PaymentUpdateWithWhereUniqueWithoutPaymentMethodInput {
  where: PaymentWhereUniqueInput!
  data: PaymentUpdateWithoutPaymentMethodDataInput!
}

input PaymentUpsertWithoutBookingInput {
  update: PaymentUpdateWithoutBookingDataInput!
  create: PaymentCreateWithoutBookingInput!
}

input PaymentUpsertWithWhereUniqueWithoutPaymentMethodInput {
  where: PaymentWhereUniqueInput!
  update: PaymentUpdateWithoutPaymentMethodDataInput!
  create: PaymentCreateWithoutPaymentMethodInput!
}

input PaymentWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaymentWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaymentWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  serviceFee: Float
  """
  All values that are not equal to given value.
  """
  serviceFee_not: Float
  """
  All values that are contained in given list.
  """
  serviceFee_in: [Float!]
  """
  All values that are not contained in given list.
  """
  serviceFee_not_in: [Float!]
  """
  All values less than the given value.
  """
  serviceFee_lt: Float
  """
  All values less than or equal the given value.
  """
  serviceFee_lte: Float
  """
  All values greater than the given value.
  """
  serviceFee_gt: Float
  """
  All values greater than or equal the given value.
  """
  serviceFee_gte: Float
  placePrice: Float
  """
  All values that are not equal to given value.
  """
  placePrice_not: Float
  """
  All values that are contained in given list.
  """
  placePrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  placePrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  placePrice_lt: Float
  """
  All values less than or equal the given value.
  """
  placePrice_lte: Float
  """
  All values greater than the given value.
  """
  placePrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  placePrice_gte: Float
  totalPrice: Float
  """
  All values that are not equal to given value.
  """
  totalPrice_not: Float
  """
  All values that are contained in given list.
  """
  totalPrice_in: [Float!]
  """
  All values that are not contained in given list.
  """
  totalPrice_not_in: [Float!]
  """
  All values less than the given value.
  """
  totalPrice_lt: Float
  """
  All values less than or equal the given value.
  """
  totalPrice_lte: Float
  """
  All values greater than the given value.
  """
  totalPrice_gt: Float
  """
  All values greater than or equal the given value.
  """
  totalPrice_gte: Float
  booking: BookingWhereInput
  paymentMethod: PaymentAccountWhereInput
}

input PaymentWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type PaypalInformationConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PaypalInformationEdge]!
  aggregate: AggregatePaypalInformation!
}

input PaypalInformationCreateInput {
  email: String!
  paymentAccount: PaymentAccountCreateOneWithoutPaypalInput!
}

input PaypalInformationCreateOneWithoutPaymentAccountInput {
  create: PaypalInformationCreateWithoutPaymentAccountInput
  connect: PaypalInformationWhereUniqueInput
}

input PaypalInformationCreateWithoutPaymentAccountInput {
  email: String!
}

"""
An edge in a connection.
"""
type PaypalInformationEdge {
  """
  The item at the end of the edge.
  """
  node: PaypalInformation!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PaypalInformationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  email_ASC
  email_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PaypalInformationPreviousValues {
  id: ID!
  createdAt: DateTime!
  email: String!
}

type PaypalInformationSubscriptionPayload {
  mutation: MutationType!
  node: PaypalInformation
  updatedFields: [String!]
  previousValues: PaypalInformationPreviousValues
}

input PaypalInformationSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaypalInformationSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaypalInformationSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PaypalInformationWhereInput
}

input PaypalInformationUpdateInput {
  email: String
  paymentAccount: PaymentAccountUpdateOneWithoutPaypalInput
}

input PaypalInformationUpdateOneWithoutPaymentAccountInput {
  create: PaypalInformationCreateWithoutPaymentAccountInput
  connect: PaypalInformationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PaypalInformationUpdateWithoutPaymentAccountDataInput
  upsert: PaypalInformationUpsertWithoutPaymentAccountInput
}

input PaypalInformationUpdateWithoutPaymentAccountDataInput {
  email: String
}

input PaypalInformationUpsertWithoutPaymentAccountInput {
  update: PaypalInformationUpdateWithoutPaymentAccountDataInput!
  create: PaypalInformationCreateWithoutPaymentAccountInput!
}

input PaypalInformationWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PaypalInformationWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PaypalInformationWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  paymentAccount: PaymentAccountWhereInput
}

input PaypalInformationWhereUniqueInput {
  id: ID
}

type Picture {
  url: String!
}

"""
A connection to a list of items.
"""
type PictureConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PictureEdge]!
  aggregate: AggregatePicture!
}

input PictureCreateInput {
  url: String!
}

input PictureCreateManyInput {
  create: [PictureCreateInput!]
}

input PictureCreateOneInput {
  create: PictureCreateInput
}

"""
An edge in a connection.
"""
type PictureEdge {
  """
  The item at the end of the edge.
  """
  node: Picture!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PictureOrderByInput {
  url_ASC
  url_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PicturePreviousValues {
  url: String!
}

type PictureSubscriptionPayload {
  mutation: MutationType!
  node: Picture
  updatedFields: [String!]
  previousValues: PicturePreviousValues
}

input PictureSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PictureSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PictureSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PictureWhereInput
}

input PictureUpdateDataInput {
  url: String
}

input PictureUpdateInput {
  url: String
}

input PictureUpdateManyInput {
  create: [PictureCreateInput!]
}

input PictureUpdateOneInput {
  create: PictureCreateInput
  disconnect: Boolean
  delete: Boolean
  update: PictureUpdateDataInput
  upsert: PictureUpsertNestedInput
}

input PictureUpsertNestedInput {
  update: PictureUpdateDataInput!
  create: PictureCreateInput!
}

input PictureWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PictureWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PictureWhereInput!]
  url: String
  """
  All values that are not equal to given value.
  """
  url_not: String
  """
  All values that are contained in given list.
  """
  url_in: [String!]
  """
  All values that are not contained in given list.
  """
  url_not_in: [String!]
  """
  All values less than the given value.
  """
  url_lt: String
  """
  All values less than or equal the given value.
  """
  url_lte: String
  """
  All values greater than the given value.
  """
  url_gt: String
  """
  All values greater than or equal the given value.
  """
  url_gte: String
  """
  All values containing the given string.
  """
  url_contains: String
  """
  All values not containing the given string.
  """
  url_not_contains: String
  """
  All values starting with the given string.
  """
  url_starts_with: String
  """
  All values not starting with the given string.
  """
  url_not_starts_with: String
  """
  All values ending with the given string.
  """
  url_ends_with: String
  """
  All values not ending with the given string.
  """
  url_not_ends_with: String
}

enum PLACE_SIZES {
  ENTIRE_HOUSE
  ENTIRE_APARTMENT
  ENTIRE_EARTH_HOUSE
  ENTIRE_CABIN
  ENTIRE_VILLA
  ENTIRE_PLACE
  ENTIRE_BOAT
  PRIVATE_ROOM
}

"""
A connection to a list of items.
"""
type PlaceConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PlaceEdge]!
  aggregate: AggregatePlace!
}

input PlaceCreateInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateManyWithoutHostInput {
  create: [PlaceCreateWithoutHostInput!]
  connect: [PlaceWhereUniqueInput!]
}

input PlaceCreateOneWithoutAmenitiesInput {
  create: PlaceCreateWithoutAmenitiesInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutBookingsInput {
  create: PlaceCreateWithoutBookingsInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutGuestRequirementsInput {
  create: PlaceCreateWithoutGuestRequirementsInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutLocationInput {
  create: PlaceCreateWithoutLocationInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutPoliciesInput {
  create: PlaceCreateWithoutPoliciesInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutPricingInput {
  create: PlaceCreateWithoutPricingInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutReviewsInput {
  create: PlaceCreateWithoutReviewsInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateOneWithoutViewsInput {
  create: PlaceCreateWithoutViewsInput
  connect: PlaceWhereUniqueInput
}

input PlaceCreateWithoutAmenitiesInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutBookingsInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutGuestRequirementsInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutHostInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutLocationInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutPoliciesInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutPricingInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutReviewsInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  views: ViewsCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

input PlaceCreateWithoutViewsInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
  reviews: ReviewCreateManyWithoutPlaceInput
  amenities: AmenitiesCreateOneWithoutPlaceInput!
  host: UserCreateOneWithoutOwnedPlacesInput!
  pricing: PricingCreateOneWithoutPlaceInput!
  location: LocationCreateOneWithoutPlaceInput!
  guestRequirements: GuestRequirementsCreateOneWithoutPlaceInput
  policies: PoliciesCreateOneWithoutPlaceInput
  houseRules: HouseRulesCreateOneInput
  bookings: BookingCreateManyWithoutPlaceInput
  pictures: PictureCreateManyInput
}

"""
An edge in a connection.
"""
type PlaceEdge {
  """
  The item at the end of the edge.
  """
  node: Place!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PlaceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  size_ASC
  size_DESC
  shortDescription_ASC
  shortDescription_DESC
  description_ASC
  description_DESC
  slug_ASC
  slug_DESC
  maxGuests_ASC
  maxGuests_DESC
  numBedrooms_ASC
  numBedrooms_DESC
  numBeds_ASC
  numBeds_DESC
  numBaths_ASC
  numBaths_DESC
  popularity_ASC
  popularity_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PlacePreviousValues {
  id: ID!
  name: String
  size: PLACE_SIZES
  shortDescription: String!
  description: String!
  slug: String!
  maxGuests: Int!
  numBedrooms: Int!
  numBeds: Int!
  numBaths: Int!
  popularity: Int!
}

type PlaceSubscriptionPayload {
  mutation: MutationType!
  node: Place
  updatedFields: [String!]
  previousValues: PlacePreviousValues
}

input PlaceSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PlaceSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PlaceSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PlaceWhereInput
}

input PlaceUpdateInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateManyWithoutHostInput {
  create: [PlaceCreateWithoutHostInput!]
  connect: [PlaceWhereUniqueInput!]
  disconnect: [PlaceWhereUniqueInput!]
  delete: [PlaceWhereUniqueInput!]
  update: [PlaceUpdateWithWhereUniqueWithoutHostInput!]
  upsert: [PlaceUpsertWithWhereUniqueWithoutHostInput!]
}

input PlaceUpdateOneWithoutAmenitiesInput {
  create: PlaceCreateWithoutAmenitiesInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutAmenitiesDataInput
  upsert: PlaceUpsertWithoutAmenitiesInput
}

input PlaceUpdateOneWithoutBookingsInput {
  create: PlaceCreateWithoutBookingsInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutBookingsDataInput
  upsert: PlaceUpsertWithoutBookingsInput
}

input PlaceUpdateOneWithoutGuestRequirementsInput {
  create: PlaceCreateWithoutGuestRequirementsInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutGuestRequirementsDataInput
  upsert: PlaceUpsertWithoutGuestRequirementsInput
}

input PlaceUpdateOneWithoutLocationInput {
  create: PlaceCreateWithoutLocationInput
  connect: PlaceWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PlaceUpdateWithoutLocationDataInput
  upsert: PlaceUpsertWithoutLocationInput
}

input PlaceUpdateOneWithoutPoliciesInput {
  create: PlaceCreateWithoutPoliciesInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutPoliciesDataInput
  upsert: PlaceUpsertWithoutPoliciesInput
}

input PlaceUpdateOneWithoutPricingInput {
  create: PlaceCreateWithoutPricingInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutPricingDataInput
  upsert: PlaceUpsertWithoutPricingInput
}

input PlaceUpdateOneWithoutReviewsInput {
  create: PlaceCreateWithoutReviewsInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutReviewsDataInput
  upsert: PlaceUpsertWithoutReviewsInput
}

input PlaceUpdateOneWithoutViewsInput {
  create: PlaceCreateWithoutViewsInput
  connect: PlaceWhereUniqueInput
  delete: Boolean
  update: PlaceUpdateWithoutViewsDataInput
  upsert: PlaceUpsertWithoutViewsInput
}

input PlaceUpdateWithoutAmenitiesDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutBookingsDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutGuestRequirementsDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutHostDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutLocationDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutPoliciesDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutPricingDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutReviewsDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  views: ViewsUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithoutViewsDataInput {
  name: String
  size: PLACE_SIZES
  shortDescription: String
  description: String
  slug: String
  maxGuests: Int
  numBedrooms: Int
  numBeds: Int
  numBaths: Int
  popularity: Int
  reviews: ReviewUpdateManyWithoutPlaceInput
  amenities: AmenitiesUpdateOneWithoutPlaceInput
  host: UserUpdateOneWithoutOwnedPlacesInput
  pricing: PricingUpdateOneWithoutPlaceInput
  location: LocationUpdateOneWithoutPlaceInput
  guestRequirements: GuestRequirementsUpdateOneWithoutPlaceInput
  policies: PoliciesUpdateOneWithoutPlaceInput
  houseRules: HouseRulesUpdateOneInput
  bookings: BookingUpdateManyWithoutPlaceInput
  pictures: PictureUpdateManyInput
}

input PlaceUpdateWithWhereUniqueWithoutHostInput {
  where: PlaceWhereUniqueInput!
  data: PlaceUpdateWithoutHostDataInput!
}

input PlaceUpsertWithoutAmenitiesInput {
  update: PlaceUpdateWithoutAmenitiesDataInput!
  create: PlaceCreateWithoutAmenitiesInput!
}

input PlaceUpsertWithoutBookingsInput {
  update: PlaceUpdateWithoutBookingsDataInput!
  create: PlaceCreateWithoutBookingsInput!
}

input PlaceUpsertWithoutGuestRequirementsInput {
  update: PlaceUpdateWithoutGuestRequirementsDataInput!
  create: PlaceCreateWithoutGuestRequirementsInput!
}

input PlaceUpsertWithoutLocationInput {
  update: PlaceUpdateWithoutLocationDataInput!
  create: PlaceCreateWithoutLocationInput!
}

input PlaceUpsertWithoutPoliciesInput {
  update: PlaceUpdateWithoutPoliciesDataInput!
  create: PlaceCreateWithoutPoliciesInput!
}

input PlaceUpsertWithoutPricingInput {
  update: PlaceUpdateWithoutPricingDataInput!
  create: PlaceCreateWithoutPricingInput!
}

input PlaceUpsertWithoutReviewsInput {
  update: PlaceUpdateWithoutReviewsDataInput!
  create: PlaceCreateWithoutReviewsInput!
}

input PlaceUpsertWithoutViewsInput {
  update: PlaceUpdateWithoutViewsDataInput!
  create: PlaceCreateWithoutViewsInput!
}

input PlaceUpsertWithWhereUniqueWithoutHostInput {
  where: PlaceWhereUniqueInput!
  update: PlaceUpdateWithoutHostDataInput!
  create: PlaceCreateWithoutHostInput!
}

input PlaceWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PlaceWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PlaceWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  size: PLACE_SIZES
  """
  All values that are not equal to given value.
  """
  size_not: PLACE_SIZES
  """
  All values that are contained in given list.
  """
  size_in: [PLACE_SIZES!]
  """
  All values that are not contained in given list.
  """
  size_not_in: [PLACE_SIZES!]
  shortDescription: String
  """
  All values that are not equal to given value.
  """
  shortDescription_not: String
  """
  All values that are contained in given list.
  """
  shortDescription_in: [String!]
  """
  All values that are not contained in given list.
  """
  shortDescription_not_in: [String!]
  """
  All values less than the given value.
  """
  shortDescription_lt: String
  """
  All values less than or equal the given value.
  """
  shortDescription_lte: String
  """
  All values greater than the given value.
  """
  shortDescription_gt: String
  """
  All values greater than or equal the given value.
  """
  shortDescription_gte: String
  """
  All values containing the given string.
  """
  shortDescription_contains: String
  """
  All values not containing the given string.
  """
  shortDescription_not_contains: String
  """
  All values starting with the given string.
  """
  shortDescription_starts_with: String
  """
  All values not starting with the given string.
  """
  shortDescription_not_starts_with: String
  """
  All values ending with the given string.
  """
  shortDescription_ends_with: String
  """
  All values not ending with the given string.
  """
  shortDescription_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  slug: String
  """
  All values that are not equal to given value.
  """
  slug_not: String
  """
  All values that are contained in given list.
  """
  slug_in: [String!]
  """
  All values that are not contained in given list.
  """
  slug_not_in: [String!]
  """
  All values less than the given value.
  """
  slug_lt: String
  """
  All values less than or equal the given value.
  """
  slug_lte: String
  """
  All values greater than the given value.
  """
  slug_gt: String
  """
  All values greater than or equal the given value.
  """
  slug_gte: String
  """
  All values containing the given string.
  """
  slug_contains: String
  """
  All values not containing the given string.
  """
  slug_not_contains: String
  """
  All values starting with the given string.
  """
  slug_starts_with: String
  """
  All values not starting with the given string.
  """
  slug_not_starts_with: String
  """
  All values ending with the given string.
  """
  slug_ends_with: String
  """
  All values not ending with the given string.
  """
  slug_not_ends_with: String
  maxGuests: Int
  """
  All values that are not equal to given value.
  """
  maxGuests_not: Int
  """
  All values that are contained in given list.
  """
  maxGuests_in: [Int!]
  """
  All values that are not contained in given list.
  """
  maxGuests_not_in: [Int!]
  """
  All values less than the given value.
  """
  maxGuests_lt: Int
  """
  All values less than or equal the given value.
  """
  maxGuests_lte: Int
  """
  All values greater than the given value.
  """
  maxGuests_gt: Int
  """
  All values greater than or equal the given value.
  """
  maxGuests_gte: Int
  numBedrooms: Int
  """
  All values that are not equal to given value.
  """
  numBedrooms_not: Int
  """
  All values that are contained in given list.
  """
  numBedrooms_in: [Int!]
  """
  All values that are not contained in given list.
  """
  numBedrooms_not_in: [Int!]
  """
  All values less than the given value.
  """
  numBedrooms_lt: Int
  """
  All values less than or equal the given value.
  """
  numBedrooms_lte: Int
  """
  All values greater than the given value.
  """
  numBedrooms_gt: Int
  """
  All values greater than or equal the given value.
  """
  numBedrooms_gte: Int
  numBeds: Int
  """
  All values that are not equal to given value.
  """
  numBeds_not: Int
  """
  All values that are contained in given list.
  """
  numBeds_in: [Int!]
  """
  All values that are not contained in given list.
  """
  numBeds_not_in: [Int!]
  """
  All values less than the given value.
  """
  numBeds_lt: Int
  """
  All values less than or equal the given value.
  """
  numBeds_lte: Int
  """
  All values greater than the given value.
  """
  numBeds_gt: Int
  """
  All values greater than or equal the given value.
  """
  numBeds_gte: Int
  numBaths: Int
  """
  All values that are not equal to given value.
  """
  numBaths_not: Int
  """
  All values that are contained in given list.
  """
  numBaths_in: [Int!]
  """
  All values that are not contained in given list.
  """
  numBaths_not_in: [Int!]
  """
  All values less than the given value.
  """
  numBaths_lt: Int
  """
  All values less than or equal the given value.
  """
  numBaths_lte: Int
  """
  All values greater than the given value.
  """
  numBaths_gt: Int
  """
  All values greater than or equal the given value.
  """
  numBaths_gte: Int
  popularity: Int
  """
  All values that are not equal to given value.
  """
  popularity_not: Int
  """
  All values that are contained in given list.
  """
  popularity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  popularity_not_in: [Int!]
  """
  All values less than the given value.
  """
  popularity_lt: Int
  """
  All values less than or equal the given value.
  """
  popularity_lte: Int
  """
  All values greater than the given value.
  """
  popularity_gt: Int
  """
  All values greater than or equal the given value.
  """
  popularity_gte: Int
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  amenities: AmenitiesWhereInput
  host: UserWhereInput
  pricing: PricingWhereInput
  location: LocationWhereInput
  views: ViewsWhereInput
  guestRequirements: GuestRequirementsWhereInput
  policies: PoliciesWhereInput
  houseRules: HouseRulesWhereInput
  bookings_every: BookingWhereInput
  bookings_some: BookingWhereInput
  bookings_none: BookingWhereInput
  pictures_every: PictureWhereInput
  pictures_some: PictureWhereInput
  pictures_none: PictureWhereInput
}

input PlaceWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type PoliciesConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PoliciesEdge]!
  aggregate: AggregatePolicies!
}

input PoliciesCreateInput {
  checkInStartTime: Float!
  checkInEndTime: Float!
  checkoutTime: Float!
  place: PlaceCreateOneWithoutPoliciesInput!
}

input PoliciesCreateOneWithoutPlaceInput {
  create: PoliciesCreateWithoutPlaceInput
  connect: PoliciesWhereUniqueInput
}

input PoliciesCreateWithoutPlaceInput {
  checkInStartTime: Float!
  checkInEndTime: Float!
  checkoutTime: Float!
}

"""
An edge in a connection.
"""
type PoliciesEdge {
  """
  The item at the end of the edge.
  """
  node: Policies!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PoliciesOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  checkInStartTime_ASC
  checkInStartTime_DESC
  checkInEndTime_ASC
  checkInEndTime_DESC
  checkoutTime_ASC
  checkoutTime_DESC
}

type PoliciesPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  checkInStartTime: Float!
  checkInEndTime: Float!
  checkoutTime: Float!
}

type PoliciesSubscriptionPayload {
  mutation: MutationType!
  node: Policies
  updatedFields: [String!]
  previousValues: PoliciesPreviousValues
}

input PoliciesSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PoliciesSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PoliciesSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PoliciesWhereInput
}

input PoliciesUpdateInput {
  checkInStartTime: Float
  checkInEndTime: Float
  checkoutTime: Float
  place: PlaceUpdateOneWithoutPoliciesInput
}

input PoliciesUpdateOneWithoutPlaceInput {
  create: PoliciesCreateWithoutPlaceInput
  connect: PoliciesWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PoliciesUpdateWithoutPlaceDataInput
  upsert: PoliciesUpsertWithoutPlaceInput
}

input PoliciesUpdateWithoutPlaceDataInput {
  checkInStartTime: Float
  checkInEndTime: Float
  checkoutTime: Float
}

input PoliciesUpsertWithoutPlaceInput {
  update: PoliciesUpdateWithoutPlaceDataInput!
  create: PoliciesCreateWithoutPlaceInput!
}

input PoliciesWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PoliciesWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PoliciesWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  checkInStartTime: Float
  """
  All values that are not equal to given value.
  """
  checkInStartTime_not: Float
  """
  All values that are contained in given list.
  """
  checkInStartTime_in: [Float!]
  """
  All values that are not contained in given list.
  """
  checkInStartTime_not_in: [Float!]
  """
  All values less than the given value.
  """
  checkInStartTime_lt: Float
  """
  All values less than or equal the given value.
  """
  checkInStartTime_lte: Float
  """
  All values greater than the given value.
  """
  checkInStartTime_gt: Float
  """
  All values greater than or equal the given value.
  """
  checkInStartTime_gte: Float
  checkInEndTime: Float
  """
  All values that are not equal to given value.
  """
  checkInEndTime_not: Float
  """
  All values that are contained in given list.
  """
  checkInEndTime_in: [Float!]
  """
  All values that are not contained in given list.
  """
  checkInEndTime_not_in: [Float!]
  """
  All values less than the given value.
  """
  checkInEndTime_lt: Float
  """
  All values less than or equal the given value.
  """
  checkInEndTime_lte: Float
  """
  All values greater than the given value.
  """
  checkInEndTime_gt: Float
  """
  All values greater than or equal the given value.
  """
  checkInEndTime_gte: Float
  checkoutTime: Float
  """
  All values that are not equal to given value.
  """
  checkoutTime_not: Float
  """
  All values that are contained in given list.
  """
  checkoutTime_in: [Float!]
  """
  All values that are not contained in given list.
  """
  checkoutTime_not_in: [Float!]
  """
  All values less than the given value.
  """
  checkoutTime_lt: Float
  """
  All values less than or equal the given value.
  """
  checkoutTime_lte: Float
  """
  All values greater than the given value.
  """
  checkoutTime_gt: Float
  """
  All values greater than or equal the given value.
  """
  checkoutTime_gte: Float
  place: PlaceWhereInput
}

input PoliciesWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type PricingConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PricingEdge]!
  aggregate: AggregatePricing!
}

input PricingCreateInput {
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int!
  smartPricing: Boolean
  basePrice: Int!
  averageWeekly: Int!
  averageMonthly: Int!
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
  place: PlaceCreateOneWithoutPricingInput!
}

input PricingCreateOneWithoutPlaceInput {
  create: PricingCreateWithoutPlaceInput
  connect: PricingWhereUniqueInput
}

input PricingCreateWithoutPlaceInput {
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int!
  smartPricing: Boolean
  basePrice: Int!
  averageWeekly: Int!
  averageMonthly: Int!
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
}

"""
An edge in a connection.
"""
type PricingEdge {
  """
  The item at the end of the edge.
  """
  node: Pricing!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PricingOrderByInput {
  id_ASC
  id_DESC
  monthlyDiscount_ASC
  monthlyDiscount_DESC
  weeklyDiscount_ASC
  weeklyDiscount_DESC
  perNight_ASC
  perNight_DESC
  smartPricing_ASC
  smartPricing_DESC
  basePrice_ASC
  basePrice_DESC
  averageWeekly_ASC
  averageWeekly_DESC
  averageMonthly_ASC
  averageMonthly_DESC
  cleaningFee_ASC
  cleaningFee_DESC
  securityDeposit_ASC
  securityDeposit_DESC
  extraGuests_ASC
  extraGuests_DESC
  weekendPricing_ASC
  weekendPricing_DESC
  currency_ASC
  currency_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PricingPreviousValues {
  id: ID!
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int!
  smartPricing: Boolean!
  basePrice: Int!
  averageWeekly: Int!
  averageMonthly: Int!
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
}

type PricingSubscriptionPayload {
  mutation: MutationType!
  node: Pricing
  updatedFields: [String!]
  previousValues: PricingPreviousValues
}

input PricingSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PricingSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PricingSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PricingWhereInput
}

input PricingUpdateInput {
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int
  smartPricing: Boolean
  basePrice: Int
  averageWeekly: Int
  averageMonthly: Int
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
  place: PlaceUpdateOneWithoutPricingInput
}

input PricingUpdateOneWithoutPlaceInput {
  create: PricingCreateWithoutPlaceInput
  connect: PricingWhereUniqueInput
  delete: Boolean
  update: PricingUpdateWithoutPlaceDataInput
  upsert: PricingUpsertWithoutPlaceInput
}

input PricingUpdateWithoutPlaceDataInput {
  monthlyDiscount: Int
  weeklyDiscount: Int
  perNight: Int
  smartPricing: Boolean
  basePrice: Int
  averageWeekly: Int
  averageMonthly: Int
  cleaningFee: Int
  securityDeposit: Int
  extraGuests: Int
  weekendPricing: Int
  currency: CURRENCY
}

input PricingUpsertWithoutPlaceInput {
  update: PricingUpdateWithoutPlaceDataInput!
  create: PricingCreateWithoutPlaceInput!
}

input PricingWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PricingWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PricingWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  monthlyDiscount: Int
  """
  All values that are not equal to given value.
  """
  monthlyDiscount_not: Int
  """
  All values that are contained in given list.
  """
  monthlyDiscount_in: [Int!]
  """
  All values that are not contained in given list.
  """
  monthlyDiscount_not_in: [Int!]
  """
  All values less than the given value.
  """
  monthlyDiscount_lt: Int
  """
  All values less than or equal the given value.
  """
  monthlyDiscount_lte: Int
  """
  All values greater than the given value.
  """
  monthlyDiscount_gt: Int
  """
  All values greater than or equal the given value.
  """
  monthlyDiscount_gte: Int
  weeklyDiscount: Int
  """
  All values that are not equal to given value.
  """
  weeklyDiscount_not: Int
  """
  All values that are contained in given list.
  """
  weeklyDiscount_in: [Int!]
  """
  All values that are not contained in given list.
  """
  weeklyDiscount_not_in: [Int!]
  """
  All values less than the given value.
  """
  weeklyDiscount_lt: Int
  """
  All values less than or equal the given value.
  """
  weeklyDiscount_lte: Int
  """
  All values greater than the given value.
  """
  weeklyDiscount_gt: Int
  """
  All values greater than or equal the given value.
  """
  weeklyDiscount_gte: Int
  perNight: Int
  """
  All values that are not equal to given value.
  """
  perNight_not: Int
  """
  All values that are contained in given list.
  """
  perNight_in: [Int!]
  """
  All values that are not contained in given list.
  """
  perNight_not_in: [Int!]
  """
  All values less than the given value.
  """
  perNight_lt: Int
  """
  All values less than or equal the given value.
  """
  perNight_lte: Int
  """
  All values greater than the given value.
  """
  perNight_gt: Int
  """
  All values greater than or equal the given value.
  """
  perNight_gte: Int
  smartPricing: Boolean
  """
  All values that are not equal to given value.
  """
  smartPricing_not: Boolean
  basePrice: Int
  """
  All values that are not equal to given value.
  """
  basePrice_not: Int
  """
  All values that are contained in given list.
  """
  basePrice_in: [Int!]
  """
  All values that are not contained in given list.
  """
  basePrice_not_in: [Int!]
  """
  All values less than the given value.
  """
  basePrice_lt: Int
  """
  All values less than or equal the given value.
  """
  basePrice_lte: Int
  """
  All values greater than the given value.
  """
  basePrice_gt: Int
  """
  All values greater than or equal the given value.
  """
  basePrice_gte: Int
  averageWeekly: Int
  """
  All values that are not equal to given value.
  """
  averageWeekly_not: Int
  """
  All values that are contained in given list.
  """
  averageWeekly_in: [Int!]
  """
  All values that are not contained in given list.
  """
  averageWeekly_not_in: [Int!]
  """
  All values less than the given value.
  """
  averageWeekly_lt: Int
  """
  All values less than or equal the given value.
  """
  averageWeekly_lte: Int
  """
  All values greater than the given value.
  """
  averageWeekly_gt: Int
  """
  All values greater than or equal the given value.
  """
  averageWeekly_gte: Int
  averageMonthly: Int
  """
  All values that are not equal to given value.
  """
  averageMonthly_not: Int
  """
  All values that are contained in given list.
  """
  averageMonthly_in: [Int!]
  """
  All values that are not contained in given list.
  """
  averageMonthly_not_in: [Int!]
  """
  All values less than the given value.
  """
  averageMonthly_lt: Int
  """
  All values less than or equal the given value.
  """
  averageMonthly_lte: Int
  """
  All values greater than the given value.
  """
  averageMonthly_gt: Int
  """
  All values greater than or equal the given value.
  """
  averageMonthly_gte: Int
  cleaningFee: Int
  """
  All values that are not equal to given value.
  """
  cleaningFee_not: Int
  """
  All values that are contained in given list.
  """
  cleaningFee_in: [Int!]
  """
  All values that are not contained in given list.
  """
  cleaningFee_not_in: [Int!]
  """
  All values less than the given value.
  """
  cleaningFee_lt: Int
  """
  All values less than or equal the given value.
  """
  cleaningFee_lte: Int
  """
  All values greater than the given value.
  """
  cleaningFee_gt: Int
  """
  All values greater than or equal the given value.
  """
  cleaningFee_gte: Int
  securityDeposit: Int
  """
  All values that are not equal to given value.
  """
  securityDeposit_not: Int
  """
  All values that are contained in given list.
  """
  securityDeposit_in: [Int!]
  """
  All values that are not contained in given list.
  """
  securityDeposit_not_in: [Int!]
  """
  All values less than the given value.
  """
  securityDeposit_lt: Int
  """
  All values less than or equal the given value.
  """
  securityDeposit_lte: Int
  """
  All values greater than the given value.
  """
  securityDeposit_gt: Int
  """
  All values greater than or equal the given value.
  """
  securityDeposit_gte: Int
  extraGuests: Int
  """
  All values that are not equal to given value.
  """
  extraGuests_not: Int
  """
  All values that are contained in given list.
  """
  extraGuests_in: [Int!]
  """
  All values that are not contained in given list.
  """
  extraGuests_not_in: [Int!]
  """
  All values less than the given value.
  """
  extraGuests_lt: Int
  """
  All values less than or equal the given value.
  """
  extraGuests_lte: Int
  """
  All values greater than the given value.
  """
  extraGuests_gt: Int
  """
  All values greater than or equal the given value.
  """
  extraGuests_gte: Int
  weekendPricing: Int
  """
  All values that are not equal to given value.
  """
  weekendPricing_not: Int
  """
  All values that are contained in given list.
  """
  weekendPricing_in: [Int!]
  """
  All values that are not contained in given list.
  """
  weekendPricing_not_in: [Int!]
  """
  All values less than the given value.
  """
  weekendPricing_lt: Int
  """
  All values less than or equal the given value.
  """
  weekendPricing_lte: Int
  """
  All values greater than the given value.
  """
  weekendPricing_gt: Int
  """
  All values greater than or equal the given value.
  """
  weekendPricing_gte: Int
  currency: CURRENCY
  """
  All values that are not equal to given value.
  """
  currency_not: CURRENCY
  """
  All values that are contained in given list.
  """
  currency_in: [CURRENCY!]
  """
  All values that are not contained in given list.
  """
  currency_not_in: [CURRENCY!]
  place: PlaceWhereInput
}

input PricingWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type RestaurantConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [RestaurantEdge]!
  aggregate: AggregateRestaurant!
}

input RestaurantCreateInput {
  title: String!
  avgPricePerPerson: Int!
  isCurated: Boolean
  slug: String!
  popularity: Int!
  pictures: PictureCreateManyInput
  location: LocationCreateOneWithoutRestaurantInput!
}

input RestaurantCreateOneWithoutLocationInput {
  create: RestaurantCreateWithoutLocationInput
  connect: RestaurantWhereUniqueInput
}

input RestaurantCreateWithoutLocationInput {
  title: String!
  avgPricePerPerson: Int!
  isCurated: Boolean
  slug: String!
  popularity: Int!
  pictures: PictureCreateManyInput
}

"""
An edge in a connection.
"""
type RestaurantEdge {
  """
  The item at the end of the edge.
  """
  node: Restaurant!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum RestaurantOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  title_ASC
  title_DESC
  avgPricePerPerson_ASC
  avgPricePerPerson_DESC
  isCurated_ASC
  isCurated_DESC
  slug_ASC
  slug_DESC
  popularity_ASC
  popularity_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RestaurantPreviousValues {
  id: ID!
  createdAt: DateTime!
  title: String!
  avgPricePerPerson: Int!
  isCurated: Boolean!
  slug: String!
  popularity: Int!
}

type RestaurantSubscriptionPayload {
  mutation: MutationType!
  node: Restaurant
  updatedFields: [String!]
  previousValues: RestaurantPreviousValues
}

input RestaurantSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [RestaurantSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [RestaurantSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RestaurantWhereInput
}

input RestaurantUpdateInput {
  title: String
  avgPricePerPerson: Int
  isCurated: Boolean
  slug: String
  popularity: Int
  pictures: PictureUpdateManyInput
  location: LocationUpdateOneWithoutRestaurantInput
}

input RestaurantUpdateOneWithoutLocationInput {
  create: RestaurantCreateWithoutLocationInput
  connect: RestaurantWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: RestaurantUpdateWithoutLocationDataInput
  upsert: RestaurantUpsertWithoutLocationInput
}

input RestaurantUpdateWithoutLocationDataInput {
  title: String
  avgPricePerPerson: Int
  isCurated: Boolean
  slug: String
  popularity: Int
  pictures: PictureUpdateManyInput
}

input RestaurantUpsertWithoutLocationInput {
  update: RestaurantUpdateWithoutLocationDataInput!
  create: RestaurantCreateWithoutLocationInput!
}

input RestaurantWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [RestaurantWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [RestaurantWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  avgPricePerPerson: Int
  """
  All values that are not equal to given value.
  """
  avgPricePerPerson_not: Int
  """
  All values that are contained in given list.
  """
  avgPricePerPerson_in: [Int!]
  """
  All values that are not contained in given list.
  """
  avgPricePerPerson_not_in: [Int!]
  """
  All values less than the given value.
  """
  avgPricePerPerson_lt: Int
  """
  All values less than or equal the given value.
  """
  avgPricePerPerson_lte: Int
  """
  All values greater than the given value.
  """
  avgPricePerPerson_gt: Int
  """
  All values greater than or equal the given value.
  """
  avgPricePerPerson_gte: Int
  isCurated: Boolean
  """
  All values that are not equal to given value.
  """
  isCurated_not: Boolean
  slug: String
  """
  All values that are not equal to given value.
  """
  slug_not: String
  """
  All values that are contained in given list.
  """
  slug_in: [String!]
  """
  All values that are not contained in given list.
  """
  slug_not_in: [String!]
  """
  All values less than the given value.
  """
  slug_lt: String
  """
  All values less than or equal the given value.
  """
  slug_lte: String
  """
  All values greater than the given value.
  """
  slug_gt: String
  """
  All values greater than or equal the given value.
  """
  slug_gte: String
  """
  All values containing the given string.
  """
  slug_contains: String
  """
  All values not containing the given string.
  """
  slug_not_contains: String
  """
  All values starting with the given string.
  """
  slug_starts_with: String
  """
  All values not starting with the given string.
  """
  slug_not_starts_with: String
  """
  All values ending with the given string.
  """
  slug_ends_with: String
  """
  All values not ending with the given string.
  """
  slug_not_ends_with: String
  popularity: Int
  """
  All values that are not equal to given value.
  """
  popularity_not: Int
  """
  All values that are contained in given list.
  """
  popularity_in: [Int!]
  """
  All values that are not contained in given list.
  """
  popularity_not_in: [Int!]
  """
  All values less than the given value.
  """
  popularity_lt: Int
  """
  All values less than or equal the given value.
  """
  popularity_lte: Int
  """
  All values greater than the given value.
  """
  popularity_gt: Int
  """
  All values greater than or equal the given value.
  """
  popularity_gte: Int
  pictures_every: PictureWhereInput
  pictures_some: PictureWhereInput
  pictures_none: PictureWhereInput
  location: LocationWhereInput
}

input RestaurantWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type ReviewConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ReviewEdge]!
  aggregate: AggregateReview!
}

input ReviewCreateInput {
  text: String!
  stars: Int!
  accuracy: Int!
  location: Int!
  checkIn: Int!
  value: Int!
  cleanliness: Int!
  communication: Int!
  place: PlaceCreateOneWithoutReviewsInput!
  experience: ExperienceCreateOneWithoutReviewsInput
}

input ReviewCreateManyWithoutExperienceInput {
  create: [ReviewCreateWithoutExperienceInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateManyWithoutPlaceInput {
  create: [ReviewCreateWithoutPlaceInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateWithoutExperienceInput {
  text: String!
  stars: Int!
  accuracy: Int!
  location: Int!
  checkIn: Int!
  value: Int!
  cleanliness: Int!
  communication: Int!
  place: PlaceCreateOneWithoutReviewsInput!
}

input ReviewCreateWithoutPlaceInput {
  text: String!
  stars: Int!
  accuracy: Int!
  location: Int!
  checkIn: Int!
  value: Int!
  cleanliness: Int!
  communication: Int!
  experience: ExperienceCreateOneWithoutReviewsInput
}

"""
An edge in a connection.
"""
type ReviewEdge {
  """
  The item at the end of the edge.
  """
  node: Review!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ReviewOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  text_ASC
  text_DESC
  stars_ASC
  stars_DESC
  accuracy_ASC
  accuracy_DESC
  location_ASC
  location_DESC
  checkIn_ASC
  checkIn_DESC
  value_ASC
  value_DESC
  cleanliness_ASC
  cleanliness_DESC
  communication_ASC
  communication_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ReviewPreviousValues {
  id: ID!
  createdAt: DateTime!
  text: String!
  stars: Int!
  accuracy: Int!
  location: Int!
  checkIn: Int!
  value: Int!
  cleanliness: Int!
  communication: Int!
}

type ReviewSubscriptionPayload {
  mutation: MutationType!
  node: Review
  updatedFields: [String!]
  previousValues: ReviewPreviousValues
}

input ReviewSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ReviewSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ReviewSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ReviewWhereInput
}

input ReviewUpdateInput {
  text: String
  stars: Int
  accuracy: Int
  location: Int
  checkIn: Int
  value: Int
  cleanliness: Int
  communication: Int
  place: PlaceUpdateOneWithoutReviewsInput
  experience: ExperienceUpdateOneWithoutReviewsInput
}

input ReviewUpdateManyWithoutExperienceInput {
  create: [ReviewCreateWithoutExperienceInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  delete: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutExperienceInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutExperienceInput!]
}

input ReviewUpdateManyWithoutPlaceInput {
  create: [ReviewCreateWithoutPlaceInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  delete: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutPlaceInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutPlaceInput!]
}

input ReviewUpdateWithoutExperienceDataInput {
  text: String
  stars: Int
  accuracy: Int
  location: Int
  checkIn: Int
  value: Int
  cleanliness: Int
  communication: Int
  place: PlaceUpdateOneWithoutReviewsInput
}

input ReviewUpdateWithoutPlaceDataInput {
  text: String
  stars: Int
  accuracy: Int
  location: Int
  checkIn: Int
  value: Int
  cleanliness: Int
  communication: Int
  experience: ExperienceUpdateOneWithoutReviewsInput
}

input ReviewUpdateWithWhereUniqueWithoutExperienceInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutExperienceDataInput!
}

input ReviewUpdateWithWhereUniqueWithoutPlaceInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutPlaceDataInput!
}

input ReviewUpsertWithWhereUniqueWithoutExperienceInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutExperienceDataInput!
  create: ReviewCreateWithoutExperienceInput!
}

input ReviewUpsertWithWhereUniqueWithoutPlaceInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutPlaceDataInput!
  create: ReviewCreateWithoutPlaceInput!
}

input ReviewWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ReviewWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ReviewWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  text: String
  """
  All values that are not equal to given value.
  """
  text_not: String
  """
  All values that are contained in given list.
  """
  text_in: [String!]
  """
  All values that are not contained in given list.
  """
  text_not_in: [String!]
  """
  All values less than the given value.
  """
  text_lt: String
  """
  All values less than or equal the given value.
  """
  text_lte: String
  """
  All values greater than the given value.
  """
  text_gt: String
  """
  All values greater than or equal the given value.
  """
  text_gte: String
  """
  All values containing the given string.
  """
  text_contains: String
  """
  All values not containing the given string.
  """
  text_not_contains: String
  """
  All values starting with the given string.
  """
  text_starts_with: String
  """
  All values not starting with the given string.
  """
  text_not_starts_with: String
  """
  All values ending with the given string.
  """
  text_ends_with: String
  """
  All values not ending with the given string.
  """
  text_not_ends_with: String
  stars: Int
  """
  All values that are not equal to given value.
  """
  stars_not: Int
  """
  All values that are contained in given list.
  """
  stars_in: [Int!]
  """
  All values that are not contained in given list.
  """
  stars_not_in: [Int!]
  """
  All values less than the given value.
  """
  stars_lt: Int
  """
  All values less than or equal the given value.
  """
  stars_lte: Int
  """
  All values greater than the given value.
  """
  stars_gt: Int
  """
  All values greater than or equal the given value.
  """
  stars_gte: Int
  accuracy: Int
  """
  All values that are not equal to given value.
  """
  accuracy_not: Int
  """
  All values that are contained in given list.
  """
  accuracy_in: [Int!]
  """
  All values that are not contained in given list.
  """
  accuracy_not_in: [Int!]
  """
  All values less than the given value.
  """
  accuracy_lt: Int
  """
  All values less than or equal the given value.
  """
  accuracy_lte: Int
  """
  All values greater than the given value.
  """
  accuracy_gt: Int
  """
  All values greater than or equal the given value.
  """
  accuracy_gte: Int
  location: Int
  """
  All values that are not equal to given value.
  """
  location_not: Int
  """
  All values that are contained in given list.
  """
  location_in: [Int!]
  """
  All values that are not contained in given list.
  """
  location_not_in: [Int!]
  """
  All values less than the given value.
  """
  location_lt: Int
  """
  All values less than or equal the given value.
  """
  location_lte: Int
  """
  All values greater than the given value.
  """
  location_gt: Int
  """
  All values greater than or equal the given value.
  """
  location_gte: Int
  checkIn: Int
  """
  All values that are not equal to given value.
  """
  checkIn_not: Int
  """
  All values that are contained in given list.
  """
  checkIn_in: [Int!]
  """
  All values that are not contained in given list.
  """
  checkIn_not_in: [Int!]
  """
  All values less than the given value.
  """
  checkIn_lt: Int
  """
  All values less than or equal the given value.
  """
  checkIn_lte: Int
  """
  All values greater than the given value.
  """
  checkIn_gt: Int
  """
  All values greater than or equal the given value.
  """
  checkIn_gte: Int
  value: Int
  """
  All values that are not equal to given value.
  """
  value_not: Int
  """
  All values that are contained in given list.
  """
  value_in: [Int!]
  """
  All values that are not contained in given list.
  """
  value_not_in: [Int!]
  """
  All values less than the given value.
  """
  value_lt: Int
  """
  All values less than or equal the given value.
  """
  value_lte: Int
  """
  All values greater than the given value.
  """
  value_gt: Int
  """
  All values greater than or equal the given value.
  """
  value_gte: Int
  cleanliness: Int
  """
  All values that are not equal to given value.
  """
  cleanliness_not: Int
  """
  All values that are contained in given list.
  """
  cleanliness_in: [Int!]
  """
  All values that are not contained in given list.
  """
  cleanliness_not_in: [Int!]
  """
  All values less than the given value.
  """
  cleanliness_lt: Int
  """
  All values less than or equal the given value.
  """
  cleanliness_lte: Int
  """
  All values greater than the given value.
  """
  cleanliness_gt: Int
  """
  All values greater than or equal the given value.
  """
  cleanliness_gte: Int
  communication: Int
  """
  All values that are not equal to given value.
  """
  communication_not: Int
  """
  All values that are contained in given list.
  """
  communication_in: [Int!]
  """
  All values that are not contained in given list.
  """
  communication_not_in: [Int!]
  """
  All values less than the given value.
  """
  communication_lt: Int
  """
  All values less than or equal the given value.
  """
  communication_lte: Int
  """
  All values greater than the given value.
  """
  communication_gt: Int
  """
  All values greater than or equal the given value.
  """
  communication_gte: Int
  place: PlaceWhereInput
  experience: ExperienceWhereInput
}

input ReviewWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateOneWithoutBookingsInput {
  create: UserCreateWithoutBookingsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutHostingExperiencesInput {
  create: UserCreateWithoutHostingExperiencesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLocationInput {
  create: UserCreateWithoutLocationInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutNotificationsInput {
  create: UserCreateWithoutNotificationsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOwnedPlacesInput {
  create: UserCreateWithoutOwnedPlacesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPaymentAccountInput {
  create: UserCreateWithoutPaymentAccountInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReceivedMessagesInput {
  create: UserCreateWithoutReceivedMessagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutSentMessagesInput {
  create: UserCreateWithoutSentMessagesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutBookingsInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutHostingExperiencesInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
}

input UserCreateWithoutLocationInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutNotificationsInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutOwnedPlacesInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutPaymentAccountInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutReceivedMessagesInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  sentMessages: MessageCreateManyWithoutFromInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

input UserCreateWithoutSentMessagesInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceCreateManyWithoutHostInput
  location: LocationCreateOneWithoutUserInput
  bookings: BookingCreateManyWithoutBookeeInput
  paymentAccount: PaymentAccountCreateManyWithoutUserInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
  profilePicture: PictureCreateOneInput
  hostingExperiences: ExperienceCreateManyWithoutHostInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  phone_ASC
  phone_DESC
  responseRate_ASC
  responseRate_DESC
  responseTime_ASC
  responseTime_DESC
  isSuperHost_ASC
  isSuperHost_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  phone: String!
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateOneWithoutBookingsInput {
  create: UserCreateWithoutBookingsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutBookingsDataInput
  upsert: UserUpsertWithoutBookingsInput
}

input UserUpdateOneWithoutHostingExperiencesInput {
  create: UserCreateWithoutHostingExperiencesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutHostingExperiencesDataInput
  upsert: UserUpsertWithoutHostingExperiencesInput
}

input UserUpdateOneWithoutLocationInput {
  create: UserCreateWithoutLocationInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutLocationDataInput
  upsert: UserUpsertWithoutLocationInput
}

input UserUpdateOneWithoutNotificationsInput {
  create: UserCreateWithoutNotificationsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutNotificationsDataInput
  upsert: UserUpsertWithoutNotificationsInput
}

input UserUpdateOneWithoutOwnedPlacesInput {
  create: UserCreateWithoutOwnedPlacesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutOwnedPlacesDataInput
  upsert: UserUpsertWithoutOwnedPlacesInput
}

input UserUpdateOneWithoutPaymentAccountInput {
  create: UserCreateWithoutPaymentAccountInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutPaymentAccountDataInput
  upsert: UserUpsertWithoutPaymentAccountInput
}

input UserUpdateOneWithoutReceivedMessagesInput {
  create: UserCreateWithoutReceivedMessagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutReceivedMessagesDataInput
  upsert: UserUpsertWithoutReceivedMessagesInput
}

input UserUpdateOneWithoutSentMessagesInput {
  create: UserCreateWithoutSentMessagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutSentMessagesDataInput
  upsert: UserUpsertWithoutSentMessagesInput
}

input UserUpdateWithoutBookingsDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutHostingExperiencesDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
}

input UserUpdateWithoutLocationDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutNotificationsDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutOwnedPlacesDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutPaymentAccountDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutReceivedMessagesDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  sentMessages: MessageUpdateManyWithoutFromInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpdateWithoutSentMessagesDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  phone: String
  responseRate: Float
  responseTime: Int
  isSuperHost: Boolean
  ownedPlaces: PlaceUpdateManyWithoutHostInput
  location: LocationUpdateOneWithoutUserInput
  bookings: BookingUpdateManyWithoutBookeeInput
  paymentAccount: PaymentAccountUpdateManyWithoutUserInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
  profilePicture: PictureUpdateOneInput
  hostingExperiences: ExperienceUpdateManyWithoutHostInput
}

input UserUpsertWithoutBookingsInput {
  update: UserUpdateWithoutBookingsDataInput!
  create: UserCreateWithoutBookingsInput!
}

input UserUpsertWithoutHostingExperiencesInput {
  update: UserUpdateWithoutHostingExperiencesDataInput!
  create: UserCreateWithoutHostingExperiencesInput!
}

input UserUpsertWithoutLocationInput {
  update: UserUpdateWithoutLocationDataInput!
  create: UserCreateWithoutLocationInput!
}

input UserUpsertWithoutNotificationsInput {
  update: UserUpdateWithoutNotificationsDataInput!
  create: UserCreateWithoutNotificationsInput!
}

input UserUpsertWithoutOwnedPlacesInput {
  update: UserUpdateWithoutOwnedPlacesDataInput!
  create: UserCreateWithoutOwnedPlacesInput!
}

input UserUpsertWithoutPaymentAccountInput {
  update: UserUpdateWithoutPaymentAccountDataInput!
  create: UserCreateWithoutPaymentAccountInput!
}

input UserUpsertWithoutReceivedMessagesInput {
  update: UserUpdateWithoutReceivedMessagesDataInput!
  create: UserCreateWithoutReceivedMessagesInput!
}

input UserUpsertWithoutSentMessagesInput {
  update: UserUpdateWithoutSentMessagesDataInput!
  create: UserCreateWithoutSentMessagesInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  firstName: String
  """
  All values that are not equal to given value.
  """
  firstName_not: String
  """
  All values that are contained in given list.
  """
  firstName_in: [String!]
  """
  All values that are not contained in given list.
  """
  firstName_not_in: [String!]
  """
  All values less than the given value.
  """
  firstName_lt: String
  """
  All values less than or equal the given value.
  """
  firstName_lte: String
  """
  All values greater than the given value.
  """
  firstName_gt: String
  """
  All values greater than or equal the given value.
  """
  firstName_gte: String
  """
  All values containing the given string.
  """
  firstName_contains: String
  """
  All values not containing the given string.
  """
  firstName_not_contains: String
  """
  All values starting with the given string.
  """
  firstName_starts_with: String
  """
  All values not starting with the given string.
  """
  firstName_not_starts_with: String
  """
  All values ending with the given string.
  """
  firstName_ends_with: String
  """
  All values not ending with the given string.
  """
  firstName_not_ends_with: String
  lastName: String
  """
  All values that are not equal to given value.
  """
  lastName_not: String
  """
  All values that are contained in given list.
  """
  lastName_in: [String!]
  """
  All values that are not contained in given list.
  """
  lastName_not_in: [String!]
  """
  All values less than the given value.
  """
  lastName_lt: String
  """
  All values less than or equal the given value.
  """
  lastName_lte: String
  """
  All values greater than the given value.
  """
  lastName_gt: String
  """
  All values greater than or equal the given value.
  """
  lastName_gte: String
  """
  All values containing the given string.
  """
  lastName_contains: String
  """
  All values not containing the given string.
  """
  lastName_not_contains: String
  """
  All values starting with the given string.
  """
  lastName_starts_with: String
  """
  All values not starting with the given string.
  """
  lastName_not_starts_with: String
  """
  All values ending with the given string.
  """
  lastName_ends_with: String
  """
  All values not ending with the given string.
  """
  lastName_not_ends_with: String
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  phone: String
  """
  All values that are not equal to given value.
  """
  phone_not: String
  """
  All values that are contained in given list.
  """
  phone_in: [String!]
  """
  All values that are not contained in given list.
  """
  phone_not_in: [String!]
  """
  All values less than the given value.
  """
  phone_lt: String
  """
  All values less than or equal the given value.
  """
  phone_lte: String
  """
  All values greater than the given value.
  """
  phone_gt: String
  """
  All values greater than or equal the given value.
  """
  phone_gte: String
  """
  All values containing the given string.
  """
  phone_contains: String
  """
  All values not containing the given string.
  """
  phone_not_contains: String
  """
  All values starting with the given string.
  """
  phone_starts_with: String
  """
  All values not starting with the given string.
  """
  phone_not_starts_with: String
  """
  All values ending with the given string.
  """
  phone_ends_with: String
  """
  All values not ending with the given string.
  """
  phone_not_ends_with: String
  responseRate: Float
  """
  All values that are not equal to given value.
  """
  responseRate_not: Float
  """
  All values that are contained in given list.
  """
  responseRate_in: [Float!]
  """
  All values that are not contained in given list.
  """
  responseRate_not_in: [Float!]
  """
  All values less than the given value.
  """
  responseRate_lt: Float
  """
  All values less than or equal the given value.
  """
  responseRate_lte: Float
  """
  All values greater than the given value.
  """
  responseRate_gt: Float
  """
  All values greater than or equal the given value.
  """
  responseRate_gte: Float
  responseTime: Int
  """
  All values that are not equal to given value.
  """
  responseTime_not: Int
  """
  All values that are contained in given list.
  """
  responseTime_in: [Int!]
  """
  All values that are not contained in given list.
  """
  responseTime_not_in: [Int!]
  """
  All values less than the given value.
  """
  responseTime_lt: Int
  """
  All values less than or equal the given value.
  """
  responseTime_lte: Int
  """
  All values greater than the given value.
  """
  responseTime_gt: Int
  """
  All values greater than or equal the given value.
  """
  responseTime_gte: Int
  isSuperHost: Boolean
  """
  All values that are not equal to given value.
  """
  isSuperHost_not: Boolean
  ownedPlaces_every: PlaceWhereInput
  ownedPlaces_some: PlaceWhereInput
  ownedPlaces_none: PlaceWhereInput
  location: LocationWhereInput
  bookings_every: BookingWhereInput
  bookings_some: BookingWhereInput
  bookings_none: BookingWhereInput
  paymentAccount_every: PaymentAccountWhereInput
  paymentAccount_some: PaymentAccountWhereInput
  paymentAccount_none: PaymentAccountWhereInput
  sentMessages_every: MessageWhereInput
  sentMessages_some: MessageWhereInput
  sentMessages_none: MessageWhereInput
  receivedMessages_every: MessageWhereInput
  receivedMessages_some: MessageWhereInput
  receivedMessages_none: MessageWhereInput
  notifications_every: NotificationWhereInput
  notifications_some: NotificationWhereInput
  notifications_none: NotificationWhereInput
  profilePicture: PictureWhereInput
  hostingExperiences_every: ExperienceWhereInput
  hostingExperiences_some: ExperienceWhereInput
  hostingExperiences_none: ExperienceWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

"""
A connection to a list of items.
"""
type ViewsConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ViewsEdge]!
  aggregate: AggregateViews!
}

input ViewsCreateInput {
  lastWeek: Int!
  place: PlaceCreateOneWithoutViewsInput!
}

input ViewsCreateOneWithoutPlaceInput {
  create: ViewsCreateWithoutPlaceInput
  connect: ViewsWhereUniqueInput
}

input ViewsCreateWithoutPlaceInput {
  lastWeek: Int!
}

"""
An edge in a connection.
"""
type ViewsEdge {
  """
  The item at the end of the edge.
  """
  node: Views!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ViewsOrderByInput {
  id_ASC
  id_DESC
  lastWeek_ASC
  lastWeek_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ViewsPreviousValues {
  id: ID!
  lastWeek: Int!
}

type ViewsSubscriptionPayload {
  mutation: MutationType!
  node: Views
  updatedFields: [String!]
  previousValues: ViewsPreviousValues
}

input ViewsSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ViewsSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ViewsSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ViewsWhereInput
}

input ViewsUpdateInput {
  lastWeek: Int
  place: PlaceUpdateOneWithoutViewsInput
}

input ViewsUpdateOneWithoutPlaceInput {
  create: ViewsCreateWithoutPlaceInput
  connect: ViewsWhereUniqueInput
  delete: Boolean
  update: ViewsUpdateWithoutPlaceDataInput
  upsert: ViewsUpsertWithoutPlaceInput
}

input ViewsUpdateWithoutPlaceDataInput {
  lastWeek: Int
}

input ViewsUpsertWithoutPlaceInput {
  update: ViewsUpdateWithoutPlaceDataInput!
  create: ViewsCreateWithoutPlaceInput!
}

input ViewsWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ViewsWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ViewsWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  lastWeek: Int
  """
  All values that are not equal to given value.
  """
  lastWeek_not: Int
  """
  All values that are contained in given list.
  """
  lastWeek_in: [Int!]
  """
  All values that are not contained in given list.
  """
  lastWeek_not_in: [Int!]
  """
  All values less than the given value.
  """
  lastWeek_lt: Int
  """
  All values less than or equal the given value.
  """
  lastWeek_lte: Int
  """
  All values greater than the given value.
  """
  lastWeek_gt: Int
  """
  All values greater than or equal the given value.
  """
  lastWeek_gte: Int
  place: PlaceWhereInput
}

input ViewsWhereUniqueInput {
  id: ID
}

type Mutation {
  createUser(data: UserCreateInput!): User!
  createPlace(data: PlaceCreateInput!): Place!
  createPricing(data: PricingCreateInput!): Pricing!
  createGuestRequirements(data: GuestRequirementsCreateInput!): GuestRequirements!
  createPolicies(data: PoliciesCreateInput!): Policies!
  createHouseRules(data: HouseRulesCreateInput!): HouseRules!
  createViews(data: ViewsCreateInput!): Views!
  createLocation(data: LocationCreateInput!): Location!
  createNeighbourhood(data: NeighbourhoodCreateInput!): Neighbourhood!
  createCity(data: CityCreateInput!): City!
  createPicture(data: PictureCreateInput!): Picture!
  createExperience(data: ExperienceCreateInput!): Experience!
  createExperienceCategory(data: ExperienceCategoryCreateInput!): ExperienceCategory!
  createAmenities(data: AmenitiesCreateInput!): Amenities!
  createReview(data: ReviewCreateInput!): Review!
  createBooking(data: BookingCreateInput!): Booking!
  createPayment(data: PaymentCreateInput!): Payment!
  createPaymentAccount(data: PaymentAccountCreateInput!): PaymentAccount!
  createPaypalInformation(data: PaypalInformationCreateInput!): PaypalInformation!
  createCreditCardInformation(data: CreditCardInformationCreateInput!): CreditCardInformation!
  createMessage(data: MessageCreateInput!): Message!
  createNotification(data: NotificationCreateInput!): Notification!
  createRestaurant(data: RestaurantCreateInput!): Restaurant!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updatePlace(data: PlaceUpdateInput!, where: PlaceWhereUniqueInput!): Place
  updatePricing(data: PricingUpdateInput!, where: PricingWhereUniqueInput!): Pricing
  updateGuestRequirements(data: GuestRequirementsUpdateInput!, where: GuestRequirementsWhereUniqueInput!): GuestRequirements
  updatePolicies(data: PoliciesUpdateInput!, where: PoliciesWhereUniqueInput!): Policies
  updateHouseRules(data: HouseRulesUpdateInput!, where: HouseRulesWhereUniqueInput!): HouseRules
  updateViews(data: ViewsUpdateInput!, where: ViewsWhereUniqueInput!): Views
  updateLocation(data: LocationUpdateInput!, where: LocationWhereUniqueInput!): Location
  updateNeighbourhood(data: NeighbourhoodUpdateInput!, where: NeighbourhoodWhereUniqueInput!): Neighbourhood
  updateCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City
  updateExperience(data: ExperienceUpdateInput!, where: ExperienceWhereUniqueInput!): Experience
  updateExperienceCategory(data: ExperienceCategoryUpdateInput!, where: ExperienceCategoryWhereUniqueInput!): ExperienceCategory
  updateAmenities(data: AmenitiesUpdateInput!, where: AmenitiesWhereUniqueInput!): Amenities
  updateReview(data: ReviewUpdateInput!, where: ReviewWhereUniqueInput!): Review
  updateBooking(data: BookingUpdateInput!, where: BookingWhereUniqueInput!): Booking
  updatePayment(data: PaymentUpdateInput!, where: PaymentWhereUniqueInput!): Payment
  updatePaymentAccount(data: PaymentAccountUpdateInput!, where: PaymentAccountWhereUniqueInput!): PaymentAccount
  updatePaypalInformation(data: PaypalInformationUpdateInput!, where: PaypalInformationWhereUniqueInput!): PaypalInformation
  updateCreditCardInformation(data: CreditCardInformationUpdateInput!, where: CreditCardInformationWhereUniqueInput!): CreditCardInformation
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateNotification(data: NotificationUpdateInput!, where: NotificationWhereUniqueInput!): Notification
  updateRestaurant(data: RestaurantUpdateInput!, where: RestaurantWhereUniqueInput!): Restaurant
  deleteUser(where: UserWhereUniqueInput!): User
  deletePlace(where: PlaceWhereUniqueInput!): Place
  deletePricing(where: PricingWhereUniqueInput!): Pricing
  deleteGuestRequirements(where: GuestRequirementsWhereUniqueInput!): GuestRequirements
  deletePolicies(where: PoliciesWhereUniqueInput!): Policies
  deleteHouseRules(where: HouseRulesWhereUniqueInput!): HouseRules
  deleteViews(where: ViewsWhereUniqueInput!): Views
  deleteLocation(where: LocationWhereUniqueInput!): Location
  deleteNeighbourhood(where: NeighbourhoodWhereUniqueInput!): Neighbourhood
  deleteCity(where: CityWhereUniqueInput!): City
  deleteExperience(where: ExperienceWhereUniqueInput!): Experience
  deleteExperienceCategory(where: ExperienceCategoryWhereUniqueInput!): ExperienceCategory
  deleteAmenities(where: AmenitiesWhereUniqueInput!): Amenities
  deleteReview(where: ReviewWhereUniqueInput!): Review
  deleteBooking(where: BookingWhereUniqueInput!): Booking
  deletePayment(where: PaymentWhereUniqueInput!): Payment
  deletePaymentAccount(where: PaymentAccountWhereUniqueInput!): PaymentAccount
  deletePaypalInformation(where: PaypalInformationWhereUniqueInput!): PaypalInformation
  deleteCreditCardInformation(where: CreditCardInformationWhereUniqueInput!): CreditCardInformation
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteNotification(where: NotificationWhereUniqueInput!): Notification
  deleteRestaurant(where: RestaurantWhereUniqueInput!): Restaurant
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertPlace(where: PlaceWhereUniqueInput!, create: PlaceCreateInput!, update: PlaceUpdateInput!): Place!
  upsertPricing(where: PricingWhereUniqueInput!, create: PricingCreateInput!, update: PricingUpdateInput!): Pricing!
  upsertGuestRequirements(where: GuestRequirementsWhereUniqueInput!, create: GuestRequirementsCreateInput!, update: GuestRequirementsUpdateInput!): GuestRequirements!
  upsertPolicies(where: PoliciesWhereUniqueInput!, create: PoliciesCreateInput!, update: PoliciesUpdateInput!): Policies!
  upsertHouseRules(where: HouseRulesWhereUniqueInput!, create: HouseRulesCreateInput!, update: HouseRulesUpdateInput!): HouseRules!
  upsertViews(where: ViewsWhereUniqueInput!, create: ViewsCreateInput!, update: ViewsUpdateInput!): Views!
  upsertLocation(where: LocationWhereUniqueInput!, create: LocationCreateInput!, update: LocationUpdateInput!): Location!
  upsertNeighbourhood(where: NeighbourhoodWhereUniqueInput!, create: NeighbourhoodCreateInput!, update: NeighbourhoodUpdateInput!): Neighbourhood!
  upsertCity(where: CityWhereUniqueInput!, create: CityCreateInput!, update: CityUpdateInput!): City!
  upsertExperience(where: ExperienceWhereUniqueInput!, create: ExperienceCreateInput!, update: ExperienceUpdateInput!): Experience!
  upsertExperienceCategory(where: ExperienceCategoryWhereUniqueInput!, create: ExperienceCategoryCreateInput!, update: ExperienceCategoryUpdateInput!): ExperienceCategory!
  upsertAmenities(where: AmenitiesWhereUniqueInput!, create: AmenitiesCreateInput!, update: AmenitiesUpdateInput!): Amenities!
  upsertReview(where: ReviewWhereUniqueInput!, create: ReviewCreateInput!, update: ReviewUpdateInput!): Review!
  upsertBooking(where: BookingWhereUniqueInput!, create: BookingCreateInput!, update: BookingUpdateInput!): Booking!
  upsertPayment(where: PaymentWhereUniqueInput!, create: PaymentCreateInput!, update: PaymentUpdateInput!): Payment!
  upsertPaymentAccount(where: PaymentAccountWhereUniqueInput!, create: PaymentAccountCreateInput!, update: PaymentAccountUpdateInput!): PaymentAccount!
  upsertPaypalInformation(where: PaypalInformationWhereUniqueInput!, create: PaypalInformationCreateInput!, update: PaypalInformationUpdateInput!): PaypalInformation!
  upsertCreditCardInformation(where: CreditCardInformationWhereUniqueInput!, create: CreditCardInformationCreateInput!, update: CreditCardInformationUpdateInput!): CreditCardInformation!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  upsertNotification(where: NotificationWhereUniqueInput!, create: NotificationCreateInput!, update: NotificationUpdateInput!): Notification!
  upsertRestaurant(where: RestaurantWhereUniqueInput!, create: RestaurantCreateInput!, update: RestaurantUpdateInput!): Restaurant!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyPlaces(data: PlaceUpdateInput!, where: PlaceWhereInput): BatchPayload!
  updateManyPricings(data: PricingUpdateInput!, where: PricingWhereInput): BatchPayload!
  updateManyGuestRequirementses(data: GuestRequirementsUpdateInput!, where: GuestRequirementsWhereInput): BatchPayload!
  updateManyPolicieses(data: PoliciesUpdateInput!, where: PoliciesWhereInput): BatchPayload!
  updateManyHouseRuleses(data: HouseRulesUpdateInput!, where: HouseRulesWhereInput): BatchPayload!
  updateManyViewses(data: ViewsUpdateInput!, where: ViewsWhereInput): BatchPayload!
  updateManyLocations(data: LocationUpdateInput!, where: LocationWhereInput): BatchPayload!
  updateManyNeighbourhoods(data: NeighbourhoodUpdateInput!, where: NeighbourhoodWhereInput): BatchPayload!
  updateManyCities(data: CityUpdateInput!, where: CityWhereInput): BatchPayload!
  updateManyPictures(data: PictureUpdateInput!, where: PictureWhereInput): BatchPayload!
  updateManyExperiences(data: ExperienceUpdateInput!, where: ExperienceWhereInput): BatchPayload!
  updateManyExperienceCategories(data: ExperienceCategoryUpdateInput!, where: ExperienceCategoryWhereInput): BatchPayload!
  updateManyAmenitieses(data: AmenitiesUpdateInput!, where: AmenitiesWhereInput): BatchPayload!
  updateManyReviews(data: ReviewUpdateInput!, where: ReviewWhereInput): BatchPayload!
  updateManyBookings(data: BookingUpdateInput!, where: BookingWhereInput): BatchPayload!
  updateManyPayments(data: PaymentUpdateInput!, where: PaymentWhereInput): BatchPayload!
  updateManyPaymentAccounts(data: PaymentAccountUpdateInput!, where: PaymentAccountWhereInput): BatchPayload!
  updateManyPaypalInformations(data: PaypalInformationUpdateInput!, where: PaypalInformationWhereInput): BatchPayload!
  updateManyCreditCardInformations(data: CreditCardInformationUpdateInput!, where: CreditCardInformationWhereInput): BatchPayload!
  updateManyMessages(data: MessageUpdateInput!, where: MessageWhereInput): BatchPayload!
  updateManyNotifications(data: NotificationUpdateInput!, where: NotificationWhereInput): BatchPayload!
  updateManyRestaurants(data: RestaurantUpdateInput!, where: RestaurantWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyPlaces(where: PlaceWhereInput): BatchPayload!
  deleteManyPricings(where: PricingWhereInput): BatchPayload!
  deleteManyGuestRequirementses(where: GuestRequirementsWhereInput): BatchPayload!
  deleteManyPolicieses(where: PoliciesWhereInput): BatchPayload!
  deleteManyHouseRuleses(where: HouseRulesWhereInput): BatchPayload!
  deleteManyViewses(where: ViewsWhereInput): BatchPayload!
  deleteManyLocations(where: LocationWhereInput): BatchPayload!
  deleteManyNeighbourhoods(where: NeighbourhoodWhereInput): BatchPayload!
  deleteManyCities(where: CityWhereInput): BatchPayload!
  deleteManyPictures(where: PictureWhereInput): BatchPayload!
  deleteManyExperiences(where: ExperienceWhereInput): BatchPayload!
  deleteManyExperienceCategories(where: ExperienceCategoryWhereInput): BatchPayload!
  deleteManyAmenitieses(where: AmenitiesWhereInput): BatchPayload!
  deleteManyReviews(where: ReviewWhereInput): BatchPayload!
  deleteManyBookings(where: BookingWhereInput): BatchPayload!
  deleteManyPayments(where: PaymentWhereInput): BatchPayload!
  deleteManyPaymentAccounts(where: PaymentAccountWhereInput): BatchPayload!
  deleteManyPaypalInformations(where: PaypalInformationWhereInput): BatchPayload!
  deleteManyCreditCardInformations(where: CreditCardInformationWhereInput): BatchPayload!
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  deleteManyNotifications(where: NotificationWhereInput): BatchPayload!
  deleteManyRestaurants(where: RestaurantWhereInput): BatchPayload!
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  places(where: PlaceWhereInput, orderBy: PlaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Place]!
  pricings(where: PricingWhereInput, orderBy: PricingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Pricing]!
  guestRequirementses(where: GuestRequirementsWhereInput, orderBy: GuestRequirementsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GuestRequirements]!
  policieses(where: PoliciesWhereInput, orderBy: PoliciesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Policies]!
  houseRuleses(where: HouseRulesWhereInput, orderBy: HouseRulesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [HouseRules]!
  viewses(where: ViewsWhereInput, orderBy: ViewsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Views]!
  locations(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Location]!
  neighbourhoods(where: NeighbourhoodWhereInput, orderBy: NeighbourhoodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Neighbourhood]!
  cities(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [City]!
  pictures(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Picture]!
  experiences(where: ExperienceWhereInput, orderBy: ExperienceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Experience]!
  experienceCategories(where: ExperienceCategoryWhereInput, orderBy: ExperienceCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ExperienceCategory]!
  amenitieses(where: AmenitiesWhereInput, orderBy: AmenitiesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Amenities]!
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review]!
  bookings(where: BookingWhereInput, orderBy: BookingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Booking]!
  payments(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payment]!
  paymentAccounts(where: PaymentAccountWhereInput, orderBy: PaymentAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PaymentAccount]!
  paypalInformations(where: PaypalInformationWhereInput, orderBy: PaypalInformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PaypalInformation]!
  creditCardInformations(where: CreditCardInformationWhereInput, orderBy: CreditCardInformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CreditCardInformation]!
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification]!
  restaurants(where: RestaurantWhereInput, orderBy: RestaurantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Restaurant]!
  user(where: UserWhereUniqueInput!): User
  place(where: PlaceWhereUniqueInput!): Place
  pricing(where: PricingWhereUniqueInput!): Pricing
  guestRequirements(where: GuestRequirementsWhereUniqueInput!): GuestRequirements
  policies(where: PoliciesWhereUniqueInput!): Policies
  houseRules(where: HouseRulesWhereUniqueInput!): HouseRules
  views(where: ViewsWhereUniqueInput!): Views
  location(where: LocationWhereUniqueInput!): Location
  neighbourhood(where: NeighbourhoodWhereUniqueInput!): Neighbourhood
  city(where: CityWhereUniqueInput!): City
  experience(where: ExperienceWhereUniqueInput!): Experience
  experienceCategory(where: ExperienceCategoryWhereUniqueInput!): ExperienceCategory
  amenities(where: AmenitiesWhereUniqueInput!): Amenities
  review(where: ReviewWhereUniqueInput!): Review
  booking(where: BookingWhereUniqueInput!): Booking
  payment(where: PaymentWhereUniqueInput!): Payment
  paymentAccount(where: PaymentAccountWhereUniqueInput!): PaymentAccount
  paypalInformation(where: PaypalInformationWhereUniqueInput!): PaypalInformation
  creditCardInformation(where: CreditCardInformationWhereUniqueInput!): CreditCardInformation
  message(where: MessageWhereUniqueInput!): Message
  notification(where: NotificationWhereUniqueInput!): Notification
  restaurant(where: RestaurantWhereUniqueInput!): Restaurant
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  placesConnection(where: PlaceWhereInput, orderBy: PlaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaceConnection!
  pricingsConnection(where: PricingWhereInput, orderBy: PricingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PricingConnection!
  guestRequirementsesConnection(where: GuestRequirementsWhereInput, orderBy: GuestRequirementsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GuestRequirementsConnection!
  policiesesConnection(where: PoliciesWhereInput, orderBy: PoliciesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PoliciesConnection!
  houseRulesesConnection(where: HouseRulesWhereInput, orderBy: HouseRulesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HouseRulesConnection!
  viewsesConnection(where: ViewsWhereInput, orderBy: ViewsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ViewsConnection!
  locationsConnection(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LocationConnection!
  neighbourhoodsConnection(where: NeighbourhoodWhereInput, orderBy: NeighbourhoodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NeighbourhoodConnection!
  citiesConnection(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CityConnection!
  picturesConnection(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PictureConnection!
  experiencesConnection(where: ExperienceWhereInput, orderBy: ExperienceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExperienceConnection!
  experienceCategoriesConnection(where: ExperienceCategoryWhereInput, orderBy: ExperienceCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ExperienceCategoryConnection!
  amenitiesesConnection(where: AmenitiesWhereInput, orderBy: AmenitiesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AmenitiesConnection!
  reviewsConnection(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReviewConnection!
  bookingsConnection(where: BookingWhereInput, orderBy: BookingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BookingConnection!
  paymentsConnection(where: PaymentWhereInput, orderBy: PaymentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PaymentConnection!
  paymentAccountsConnection(where: PaymentAccountWhereInput, orderBy: PaymentAccountOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PaymentAccountConnection!
  paypalInformationsConnection(where: PaypalInformationWhereInput, orderBy: PaypalInformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PaypalInformationConnection!
  creditCardInformationsConnection(where: CreditCardInformationWhereInput, orderBy: CreditCardInformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CreditCardInformationConnection!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  notificationsConnection(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NotificationConnection!
  restaurantsConnection(where: RestaurantWhereInput, orderBy: RestaurantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RestaurantConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  place(where: PlaceSubscriptionWhereInput): PlaceSubscriptionPayload
  pricing(where: PricingSubscriptionWhereInput): PricingSubscriptionPayload
  guestRequirements(where: GuestRequirementsSubscriptionWhereInput): GuestRequirementsSubscriptionPayload
  policies(where: PoliciesSubscriptionWhereInput): PoliciesSubscriptionPayload
  houseRules(where: HouseRulesSubscriptionWhereInput): HouseRulesSubscriptionPayload
  views(where: ViewsSubscriptionWhereInput): ViewsSubscriptionPayload
  location(where: LocationSubscriptionWhereInput): LocationSubscriptionPayload
  neighbourhood(where: NeighbourhoodSubscriptionWhereInput): NeighbourhoodSubscriptionPayload
  city(where: CitySubscriptionWhereInput): CitySubscriptionPayload
  picture(where: PictureSubscriptionWhereInput): PictureSubscriptionPayload
  experience(where: ExperienceSubscriptionWhereInput): ExperienceSubscriptionPayload
  experienceCategory(where: ExperienceCategorySubscriptionWhereInput): ExperienceCategorySubscriptionPayload
  amenities(where: AmenitiesSubscriptionWhereInput): AmenitiesSubscriptionPayload
  review(where: ReviewSubscriptionWhereInput): ReviewSubscriptionPayload
  booking(where: BookingSubscriptionWhereInput): BookingSubscriptionPayload
  payment(where: PaymentSubscriptionWhereInput): PaymentSubscriptionPayload
  paymentAccount(where: PaymentAccountSubscriptionWhereInput): PaymentAccountSubscriptionPayload
  paypalInformation(where: PaypalInformationSubscriptionWhereInput): PaypalInformationSubscriptionPayload
  creditCardInformation(where: CreditCardInformationSubscriptionWhereInput): CreditCardInformationSubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  notification(where: NotificationSubscriptionWhereInput): NotificationSubscriptionPayload
  restaurant(where: RestaurantSubscriptionWhereInput): RestaurantSubscriptionPayload
}
`

module.exports.Prisma = class Binding extends Prisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });

    var self = this
    this.exists = {
      User(where) {
        return super.existsDelegate('query', 'users', { where }, {}, '{ id }')
      },
      Place(where) {
        return super.existsDelegate('query', 'places', { where }, {}, '{ id }')
      },
      Pricing(where) {
        return super.existsDelegate('query', 'pricings', { where }, {}, '{ id }')
      },
      GuestRequirements(where) {
        return super.existsDelegate('query', 'guestRequirementses', { where }, {}, '{ id }')
      },
      Policies(where) {
        return super.existsDelegate('query', 'policieses', { where }, {}, '{ id }')
      },
      HouseRules(where) {
        return super.existsDelegate('query', 'houseRuleses', { where }, {}, '{ id }')
      },
      Views(where) {
        return super.existsDelegate('query', 'viewses', { where }, {}, '{ id }')
      },
      Location(where) {
        return super.existsDelegate('query', 'locations', { where }, {}, '{ id }')
      },
      Neighbourhood(where) {
        return super.existsDelegate('query', 'neighbourhoods', { where }, {}, '{ id }')
      },
      City(where) {
        return super.existsDelegate('query', 'cities', { where }, {}, '{ id }')
      },
      Picture(where) {
        return super.existsDelegate('query', 'pictures', { where }, {}, '{ id }')
      },
      Experience(where) {
        return super.existsDelegate('query', 'experiences', { where }, {}, '{ id }')
      },
      ExperienceCategory(where) {
        return super.existsDelegate('query', 'experienceCategories', { where }, {}, '{ id }')
      },
      Amenities(where) {
        return super.existsDelegate('query', 'amenitieses', { where }, {}, '{ id }')
      },
      Review(where) {
        return super.existsDelegate('query', 'reviews', { where }, {}, '{ id }')
      },
      Booking(where) {
        return super.existsDelegate('query', 'bookings', { where }, {}, '{ id }')
      },
      Payment(where) {
        return super.existsDelegate('query', 'payments', { where }, {}, '{ id }')
      },
      PaymentAccount(where) {
        return super.existsDelegate('query', 'paymentAccounts', { where }, {}, '{ id }')
      },
      PaypalInformation(where) {
        return super.existsDelegate('query', 'paypalInformations', { where }, {}, '{ id }')
      },
      CreditCardInformation(where) {
        return super.existsDelegate('query', 'creditCardInformations', { where }, {}, '{ id }')
      },
      Message(where) {
        return super.existsDelegate('query', 'messages', { where }, {}, '{ id }')
      },
      Notification(where) {
        return super.existsDelegate('query', 'notifications', { where }, {}, '{ id }')
      },
      Restaurant(where) {
        return super.existsDelegate('query', 'restaurants', { where }, {}, '{ id }')
      }
    }

    this.query = {
      users(args, info) { 
        return self.delegate('query', 'users', args, {}, info)
      },
      places(args, info) { 
        return self.delegate('query', 'places', args, {}, info)
      },
      pricings(args, info) { 
        return self.delegate('query', 'pricings', args, {}, info)
      },
      guestRequirementses(args, info) { 
        return self.delegate('query', 'guestRequirementses', args, {}, info)
      },
      policieses(args, info) { 
        return self.delegate('query', 'policieses', args, {}, info)
      },
      houseRuleses(args, info) { 
        return self.delegate('query', 'houseRuleses', args, {}, info)
      },
      viewses(args, info) { 
        return self.delegate('query', 'viewses', args, {}, info)
      },
      locations(args, info) { 
        return self.delegate('query', 'locations', args, {}, info)
      },
      neighbourhoods(args, info) { 
        return self.delegate('query', 'neighbourhoods', args, {}, info)
      },
      cities(args, info) { 
        return self.delegate('query', 'cities', args, {}, info)
      },
      pictures(args, info) { 
        return self.delegate('query', 'pictures', args, {}, info)
      },
      experiences(args, info) { 
        return self.delegate('query', 'experiences', args, {}, info)
      },
      experienceCategories(args, info) { 
        return self.delegate('query', 'experienceCategories', args, {}, info)
      },
      amenitieses(args, info) { 
        return self.delegate('query', 'amenitieses', args, {}, info)
      },
      reviews(args, info) { 
        return self.delegate('query', 'reviews', args, {}, info)
      },
      bookings(args, info) { 
        return self.delegate('query', 'bookings', args, {}, info)
      },
      payments(args, info) { 
        return self.delegate('query', 'payments', args, {}, info)
      },
      paymentAccounts(args, info) { 
        return self.delegate('query', 'paymentAccounts', args, {}, info)
      },
      paypalInformations(args, info) { 
        return self.delegate('query', 'paypalInformations', args, {}, info)
      },
      creditCardInformations(args, info) { 
        return self.delegate('query', 'creditCardInformations', args, {}, info)
      },
      messages(args, info) { 
        return self.delegate('query', 'messages', args, {}, info)
      },
      notifications(args, info) { 
        return self.delegate('query', 'notifications', args, {}, info)
      },
      restaurants(args, info) { 
        return self.delegate('query', 'restaurants', args, {}, info)
      },
      user(args, info) { 
        return self.delegate('query', 'user', args, {}, info)
      },
      place(args, info) { 
        return self.delegate('query', 'place', args, {}, info)
      },
      pricing(args, info) { 
        return self.delegate('query', 'pricing', args, {}, info)
      },
      guestRequirements(args, info) { 
        return self.delegate('query', 'guestRequirements', args, {}, info)
      },
      policies(args, info) { 
        return self.delegate('query', 'policies', args, {}, info)
      },
      houseRules(args, info) { 
        return self.delegate('query', 'houseRules', args, {}, info)
      },
      views(args, info) { 
        return self.delegate('query', 'views', args, {}, info)
      },
      location(args, info) { 
        return self.delegate('query', 'location', args, {}, info)
      },
      neighbourhood(args, info) { 
        return self.delegate('query', 'neighbourhood', args, {}, info)
      },
      city(args, info) { 
        return self.delegate('query', 'city', args, {}, info)
      },
      experience(args, info) { 
        return self.delegate('query', 'experience', args, {}, info)
      },
      experienceCategory(args, info) { 
        return self.delegate('query', 'experienceCategory', args, {}, info)
      },
      amenities(args, info) { 
        return self.delegate('query', 'amenities', args, {}, info)
      },
      review(args, info) { 
        return self.delegate('query', 'review', args, {}, info)
      },
      booking(args, info) { 
        return self.delegate('query', 'booking', args, {}, info)
      },
      payment(args, info) { 
        return self.delegate('query', 'payment', args, {}, info)
      },
      paymentAccount(args, info) { 
        return self.delegate('query', 'paymentAccount', args, {}, info)
      },
      paypalInformation(args, info) { 
        return self.delegate('query', 'paypalInformation', args, {}, info)
      },
      creditCardInformation(args, info) { 
        return self.delegate('query', 'creditCardInformation', args, {}, info)
      },
      message(args, info) { 
        return self.delegate('query', 'message', args, {}, info)
      },
      notification(args, info) { 
        return self.delegate('query', 'notification', args, {}, info)
      },
      restaurant(args, info) { 
        return self.delegate('query', 'restaurant', args, {}, info)
      },
      usersConnection(args, info) { 
        return self.delegate('query', 'usersConnection', args, {}, info)
      },
      placesConnection(args, info) { 
        return self.delegate('query', 'placesConnection', args, {}, info)
      },
      pricingsConnection(args, info) { 
        return self.delegate('query', 'pricingsConnection', args, {}, info)
      },
      guestRequirementsesConnection(args, info) { 
        return self.delegate('query', 'guestRequirementsesConnection', args, {}, info)
      },
      policiesesConnection(args, info) { 
        return self.delegate('query', 'policiesesConnection', args, {}, info)
      },
      houseRulesesConnection(args, info) { 
        return self.delegate('query', 'houseRulesesConnection', args, {}, info)
      },
      viewsesConnection(args, info) { 
        return self.delegate('query', 'viewsesConnection', args, {}, info)
      },
      locationsConnection(args, info) { 
        return self.delegate('query', 'locationsConnection', args, {}, info)
      },
      neighbourhoodsConnection(args, info) { 
        return self.delegate('query', 'neighbourhoodsConnection', args, {}, info)
      },
      citiesConnection(args, info) { 
        return self.delegate('query', 'citiesConnection', args, {}, info)
      },
      picturesConnection(args, info) { 
        return self.delegate('query', 'picturesConnection', args, {}, info)
      },
      experiencesConnection(args, info) { 
        return self.delegate('query', 'experiencesConnection', args, {}, info)
      },
      experienceCategoriesConnection(args, info) { 
        return self.delegate('query', 'experienceCategoriesConnection', args, {}, info)
      },
      amenitiesesConnection(args, info) { 
        return self.delegate('query', 'amenitiesesConnection', args, {}, info)
      },
      reviewsConnection(args, info) { 
        return self.delegate('query', 'reviewsConnection', args, {}, info)
      },
      bookingsConnection(args, info) { 
        return self.delegate('query', 'bookingsConnection', args, {}, info)
      },
      paymentsConnection(args, info) { 
        return self.delegate('query', 'paymentsConnection', args, {}, info)
      },
      paymentAccountsConnection(args, info) { 
        return self.delegate('query', 'paymentAccountsConnection', args, {}, info)
      },
      paypalInformationsConnection(args, info) { 
        return self.delegate('query', 'paypalInformationsConnection', args, {}, info)
      },
      creditCardInformationsConnection(args, info) { 
        return self.delegate('query', 'creditCardInformationsConnection', args, {}, info)
      },
      messagesConnection(args, info) { 
        return self.delegate('query', 'messagesConnection', args, {}, info)
      },
      notificationsConnection(args, info) { 
        return self.delegate('query', 'notificationsConnection', args, {}, info)
      },
      restaurantsConnection(args, info) { 
        return self.delegate('query', 'restaurantsConnection', args, {}, info)
      },
      node(args, info) { 
        return self.delegate('query', 'node', args, {}, info)
      }
    }
      
    this.mutation = {
      createUser(args, info) { 
        return self.delegate('mutation', 'createUser', args, {}, info)
      },
      createPlace(args, info) { 
        return self.delegate('mutation', 'createPlace', args, {}, info)
      },
      createPricing(args, info) { 
        return self.delegate('mutation', 'createPricing', args, {}, info)
      },
      createGuestRequirements(args, info) { 
        return self.delegate('mutation', 'createGuestRequirements', args, {}, info)
      },
      createPolicies(args, info) { 
        return self.delegate('mutation', 'createPolicies', args, {}, info)
      },
      createHouseRules(args, info) { 
        return self.delegate('mutation', 'createHouseRules', args, {}, info)
      },
      createViews(args, info) { 
        return self.delegate('mutation', 'createViews', args, {}, info)
      },
      createLocation(args, info) { 
        return self.delegate('mutation', 'createLocation', args, {}, info)
      },
      createNeighbourhood(args, info) { 
        return self.delegate('mutation', 'createNeighbourhood', args, {}, info)
      },
      createCity(args, info) { 
        return self.delegate('mutation', 'createCity', args, {}, info)
      },
      createPicture(args, info) { 
        return self.delegate('mutation', 'createPicture', args, {}, info)
      },
      createExperience(args, info) { 
        return self.delegate('mutation', 'createExperience', args, {}, info)
      },
      createExperienceCategory(args, info) { 
        return self.delegate('mutation', 'createExperienceCategory', args, {}, info)
      },
      createAmenities(args, info) { 
        return self.delegate('mutation', 'createAmenities', args, {}, info)
      },
      createReview(args, info) { 
        return self.delegate('mutation', 'createReview', args, {}, info)
      },
      createBooking(args, info) { 
        return self.delegate('mutation', 'createBooking', args, {}, info)
      },
      createPayment(args, info) { 
        return self.delegate('mutation', 'createPayment', args, {}, info)
      },
      createPaymentAccount(args, info) { 
        return self.delegate('mutation', 'createPaymentAccount', args, {}, info)
      },
      createPaypalInformation(args, info) { 
        return self.delegate('mutation', 'createPaypalInformation', args, {}, info)
      },
      createCreditCardInformation(args, info) { 
        return self.delegate('mutation', 'createCreditCardInformation', args, {}, info)
      },
      createMessage(args, info) { 
        return self.delegate('mutation', 'createMessage', args, {}, info)
      },
      createNotification(args, info) { 
        return self.delegate('mutation', 'createNotification', args, {}, info)
      },
      createRestaurant(args, info) { 
        return self.delegate('mutation', 'createRestaurant', args, {}, info)
      },
      updateUser(args, info) { 
        return self.delegate('mutation', 'updateUser', args, {}, info)
      },
      updatePlace(args, info) { 
        return self.delegate('mutation', 'updatePlace', args, {}, info)
      },
      updatePricing(args, info) { 
        return self.delegate('mutation', 'updatePricing', args, {}, info)
      },
      updateGuestRequirements(args, info) { 
        return self.delegate('mutation', 'updateGuestRequirements', args, {}, info)
      },
      updatePolicies(args, info) { 
        return self.delegate('mutation', 'updatePolicies', args, {}, info)
      },
      updateHouseRules(args, info) { 
        return self.delegate('mutation', 'updateHouseRules', args, {}, info)
      },
      updateViews(args, info) { 
        return self.delegate('mutation', 'updateViews', args, {}, info)
      },
      updateLocation(args, info) { 
        return self.delegate('mutation', 'updateLocation', args, {}, info)
      },
      updateNeighbourhood(args, info) { 
        return self.delegate('mutation', 'updateNeighbourhood', args, {}, info)
      },
      updateCity(args, info) { 
        return self.delegate('mutation', 'updateCity', args, {}, info)
      },
      updateExperience(args, info) { 
        return self.delegate('mutation', 'updateExperience', args, {}, info)
      },
      updateExperienceCategory(args, info) { 
        return self.delegate('mutation', 'updateExperienceCategory', args, {}, info)
      },
      updateAmenities(args, info) { 
        return self.delegate('mutation', 'updateAmenities', args, {}, info)
      },
      updateReview(args, info) { 
        return self.delegate('mutation', 'updateReview', args, {}, info)
      },
      updateBooking(args, info) { 
        return self.delegate('mutation', 'updateBooking', args, {}, info)
      },
      updatePayment(args, info) { 
        return self.delegate('mutation', 'updatePayment', args, {}, info)
      },
      updatePaymentAccount(args, info) { 
        return self.delegate('mutation', 'updatePaymentAccount', args, {}, info)
      },
      updatePaypalInformation(args, info) { 
        return self.delegate('mutation', 'updatePaypalInformation', args, {}, info)
      },
      updateCreditCardInformation(args, info) { 
        return self.delegate('mutation', 'updateCreditCardInformation', args, {}, info)
      },
      updateMessage(args, info) { 
        return self.delegate('mutation', 'updateMessage', args, {}, info)
      },
      updateNotification(args, info) { 
        return self.delegate('mutation', 'updateNotification', args, {}, info)
      },
      updateRestaurant(args, info) { 
        return self.delegate('mutation', 'updateRestaurant', args, {}, info)
      },
      deleteUser(args, info) { 
        return self.delegate('mutation', 'deleteUser', args, {}, info)
      },
      deletePlace(args, info) { 
        return self.delegate('mutation', 'deletePlace', args, {}, info)
      },
      deletePricing(args, info) { 
        return self.delegate('mutation', 'deletePricing', args, {}, info)
      },
      deleteGuestRequirements(args, info) { 
        return self.delegate('mutation', 'deleteGuestRequirements', args, {}, info)
      },
      deletePolicies(args, info) { 
        return self.delegate('mutation', 'deletePolicies', args, {}, info)
      },
      deleteHouseRules(args, info) { 
        return self.delegate('mutation', 'deleteHouseRules', args, {}, info)
      },
      deleteViews(args, info) { 
        return self.delegate('mutation', 'deleteViews', args, {}, info)
      },
      deleteLocation(args, info) { 
        return self.delegate('mutation', 'deleteLocation', args, {}, info)
      },
      deleteNeighbourhood(args, info) { 
        return self.delegate('mutation', 'deleteNeighbourhood', args, {}, info)
      },
      deleteCity(args, info) { 
        return self.delegate('mutation', 'deleteCity', args, {}, info)
      },
      deleteExperience(args, info) { 
        return self.delegate('mutation', 'deleteExperience', args, {}, info)
      },
      deleteExperienceCategory(args, info) { 
        return self.delegate('mutation', 'deleteExperienceCategory', args, {}, info)
      },
      deleteAmenities(args, info) { 
        return self.delegate('mutation', 'deleteAmenities', args, {}, info)
      },
      deleteReview(args, info) { 
        return self.delegate('mutation', 'deleteReview', args, {}, info)
      },
      deleteBooking(args, info) { 
        return self.delegate('mutation', 'deleteBooking', args, {}, info)
      },
      deletePayment(args, info) { 
        return self.delegate('mutation', 'deletePayment', args, {}, info)
      },
      deletePaymentAccount(args, info) { 
        return self.delegate('mutation', 'deletePaymentAccount', args, {}, info)
      },
      deletePaypalInformation(args, info) { 
        return self.delegate('mutation', 'deletePaypalInformation', args, {}, info)
      },
      deleteCreditCardInformation(args, info) { 
        return self.delegate('mutation', 'deleteCreditCardInformation', args, {}, info)
      },
      deleteMessage(args, info) { 
        return self.delegate('mutation', 'deleteMessage', args, {}, info)
      },
      deleteNotification(args, info) { 
        return self.delegate('mutation', 'deleteNotification', args, {}, info)
      },
      deleteRestaurant(args, info) { 
        return self.delegate('mutation', 'deleteRestaurant', args, {}, info)
      },
      upsertUser(args, info) { 
        return self.delegate('mutation', 'upsertUser', args, {}, info)
      },
      upsertPlace(args, info) { 
        return self.delegate('mutation', 'upsertPlace', args, {}, info)
      },
      upsertPricing(args, info) { 
        return self.delegate('mutation', 'upsertPricing', args, {}, info)
      },
      upsertGuestRequirements(args, info) { 
        return self.delegate('mutation', 'upsertGuestRequirements', args, {}, info)
      },
      upsertPolicies(args, info) { 
        return self.delegate('mutation', 'upsertPolicies', args, {}, info)
      },
      upsertHouseRules(args, info) { 
        return self.delegate('mutation', 'upsertHouseRules', args, {}, info)
      },
      upsertViews(args, info) { 
        return self.delegate('mutation', 'upsertViews', args, {}, info)
      },
      upsertLocation(args, info) { 
        return self.delegate('mutation', 'upsertLocation', args, {}, info)
      },
      upsertNeighbourhood(args, info) { 
        return self.delegate('mutation', 'upsertNeighbourhood', args, {}, info)
      },
      upsertCity(args, info) { 
        return self.delegate('mutation', 'upsertCity', args, {}, info)
      },
      upsertExperience(args, info) { 
        return self.delegate('mutation', 'upsertExperience', args, {}, info)
      },
      upsertExperienceCategory(args, info) { 
        return self.delegate('mutation', 'upsertExperienceCategory', args, {}, info)
      },
      upsertAmenities(args, info) { 
        return self.delegate('mutation', 'upsertAmenities', args, {}, info)
      },
      upsertReview(args, info) { 
        return self.delegate('mutation', 'upsertReview', args, {}, info)
      },
      upsertBooking(args, info) { 
        return self.delegate('mutation', 'upsertBooking', args, {}, info)
      },
      upsertPayment(args, info) { 
        return self.delegate('mutation', 'upsertPayment', args, {}, info)
      },
      upsertPaymentAccount(args, info) { 
        return self.delegate('mutation', 'upsertPaymentAccount', args, {}, info)
      },
      upsertPaypalInformation(args, info) { 
        return self.delegate('mutation', 'upsertPaypalInformation', args, {}, info)
      },
      upsertCreditCardInformation(args, info) { 
        return self.delegate('mutation', 'upsertCreditCardInformation', args, {}, info)
      },
      upsertMessage(args, info) { 
        return self.delegate('mutation', 'upsertMessage', args, {}, info)
      },
      upsertNotification(args, info) { 
        return self.delegate('mutation', 'upsertNotification', args, {}, info)
      },
      upsertRestaurant(args, info) { 
        return self.delegate('mutation', 'upsertRestaurant', args, {}, info)
      },
      updateManyUsers(args, info) { 
        return self.delegate('mutation', 'updateManyUsers', args, {}, info)
      },
      updateManyPlaces(args, info) { 
        return self.delegate('mutation', 'updateManyPlaces', args, {}, info)
      },
      updateManyPricings(args, info) { 
        return self.delegate('mutation', 'updateManyPricings', args, {}, info)
      },
      updateManyGuestRequirementses(args, info) { 
        return self.delegate('mutation', 'updateManyGuestRequirementses', args, {}, info)
      },
      updateManyPolicieses(args, info) { 
        return self.delegate('mutation', 'updateManyPolicieses', args, {}, info)
      },
      updateManyHouseRuleses(args, info) { 
        return self.delegate('mutation', 'updateManyHouseRuleses', args, {}, info)
      },
      updateManyViewses(args, info) { 
        return self.delegate('mutation', 'updateManyViewses', args, {}, info)
      },
      updateManyLocations(args, info) { 
        return self.delegate('mutation', 'updateManyLocations', args, {}, info)
      },
      updateManyNeighbourhoods(args, info) { 
        return self.delegate('mutation', 'updateManyNeighbourhoods', args, {}, info)
      },
      updateManyCities(args, info) { 
        return self.delegate('mutation', 'updateManyCities', args, {}, info)
      },
      updateManyPictures(args, info) { 
        return self.delegate('mutation', 'updateManyPictures', args, {}, info)
      },
      updateManyExperiences(args, info) { 
        return self.delegate('mutation', 'updateManyExperiences', args, {}, info)
      },
      updateManyExperienceCategories(args, info) { 
        return self.delegate('mutation', 'updateManyExperienceCategories', args, {}, info)
      },
      updateManyAmenitieses(args, info) { 
        return self.delegate('mutation', 'updateManyAmenitieses', args, {}, info)
      },
      updateManyReviews(args, info) { 
        return self.delegate('mutation', 'updateManyReviews', args, {}, info)
      },
      updateManyBookings(args, info) { 
        return self.delegate('mutation', 'updateManyBookings', args, {}, info)
      },
      updateManyPayments(args, info) { 
        return self.delegate('mutation', 'updateManyPayments', args, {}, info)
      },
      updateManyPaymentAccounts(args, info) { 
        return self.delegate('mutation', 'updateManyPaymentAccounts', args, {}, info)
      },
      updateManyPaypalInformations(args, info) { 
        return self.delegate('mutation', 'updateManyPaypalInformations', args, {}, info)
      },
      updateManyCreditCardInformations(args, info) { 
        return self.delegate('mutation', 'updateManyCreditCardInformations', args, {}, info)
      },
      updateManyMessages(args, info) { 
        return self.delegate('mutation', 'updateManyMessages', args, {}, info)
      },
      updateManyNotifications(args, info) { 
        return self.delegate('mutation', 'updateManyNotifications', args, {}, info)
      },
      updateManyRestaurants(args, info) { 
        return self.delegate('mutation', 'updateManyRestaurants', args, {}, info)
      },
      deleteManyUsers(args, info) { 
        return self.delegate('mutation', 'deleteManyUsers', args, {}, info)
      },
      deleteManyPlaces(args, info) { 
        return self.delegate('mutation', 'deleteManyPlaces', args, {}, info)
      },
      deleteManyPricings(args, info) { 
        return self.delegate('mutation', 'deleteManyPricings', args, {}, info)
      },
      deleteManyGuestRequirementses(args, info) { 
        return self.delegate('mutation', 'deleteManyGuestRequirementses', args, {}, info)
      },
      deleteManyPolicieses(args, info) { 
        return self.delegate('mutation', 'deleteManyPolicieses', args, {}, info)
      },
      deleteManyHouseRuleses(args, info) { 
        return self.delegate('mutation', 'deleteManyHouseRuleses', args, {}, info)
      },
      deleteManyViewses(args, info) { 
        return self.delegate('mutation', 'deleteManyViewses', args, {}, info)
      },
      deleteManyLocations(args, info) { 
        return self.delegate('mutation', 'deleteManyLocations', args, {}, info)
      },
      deleteManyNeighbourhoods(args, info) { 
        return self.delegate('mutation', 'deleteManyNeighbourhoods', args, {}, info)
      },
      deleteManyCities(args, info) { 
        return self.delegate('mutation', 'deleteManyCities', args, {}, info)
      },
      deleteManyPictures(args, info) { 
        return self.delegate('mutation', 'deleteManyPictures', args, {}, info)
      },
      deleteManyExperiences(args, info) { 
        return self.delegate('mutation', 'deleteManyExperiences', args, {}, info)
      },
      deleteManyExperienceCategories(args, info) { 
        return self.delegate('mutation', 'deleteManyExperienceCategories', args, {}, info)
      },
      deleteManyAmenitieses(args, info) { 
        return self.delegate('mutation', 'deleteManyAmenitieses', args, {}, info)
      },
      deleteManyReviews(args, info) { 
        return self.delegate('mutation', 'deleteManyReviews', args, {}, info)
      },
      deleteManyBookings(args, info) { 
        return self.delegate('mutation', 'deleteManyBookings', args, {}, info)
      },
      deleteManyPayments(args, info) { 
        return self.delegate('mutation', 'deleteManyPayments', args, {}, info)
      },
      deleteManyPaymentAccounts(args, info) { 
        return self.delegate('mutation', 'deleteManyPaymentAccounts', args, {}, info)
      },
      deleteManyPaypalInformations(args, info) { 
        return self.delegate('mutation', 'deleteManyPaypalInformations', args, {}, info)
      },
      deleteManyCreditCardInformations(args, info) { 
        return self.delegate('mutation', 'deleteManyCreditCardInformations', args, {}, info)
      },
      deleteManyMessages(args, info) { 
        return self.delegate('mutation', 'deleteManyMessages', args, {}, info)
      },
      deleteManyNotifications(args, info) { 
        return self.delegate('mutation', 'deleteManyNotifications', args, {}, info)
      },
      deleteManyRestaurants(args, info) { 
        return self.delegate('mutation', 'deleteManyRestaurants', args, {}, info)
      }
    }
      
    this.subscription = {
      user(args, infoOrQuery) { 
        return self.delegateSubscription('user', args, {}, infoOrQuery)
      },
      place(args, infoOrQuery) { 
        return self.delegateSubscription('place', args, {}, infoOrQuery)
      },
      pricing(args, infoOrQuery) { 
        return self.delegateSubscription('pricing', args, {}, infoOrQuery)
      },
      guestRequirements(args, infoOrQuery) { 
        return self.delegateSubscription('guestRequirements', args, {}, infoOrQuery)
      },
      policies(args, infoOrQuery) { 
        return self.delegateSubscription('policies', args, {}, infoOrQuery)
      },
      houseRules(args, infoOrQuery) { 
        return self.delegateSubscription('houseRules', args, {}, infoOrQuery)
      },
      views(args, infoOrQuery) { 
        return self.delegateSubscription('views', args, {}, infoOrQuery)
      },
      location(args, infoOrQuery) { 
        return self.delegateSubscription('location', args, {}, infoOrQuery)
      },
      neighbourhood(args, infoOrQuery) { 
        return self.delegateSubscription('neighbourhood', args, {}, infoOrQuery)
      },
      city(args, infoOrQuery) { 
        return self.delegateSubscription('city', args, {}, infoOrQuery)
      },
      picture(args, infoOrQuery) { 
        return self.delegateSubscription('picture', args, {}, infoOrQuery)
      },
      experience(args, infoOrQuery) { 
        return self.delegateSubscription('experience', args, {}, infoOrQuery)
      },
      experienceCategory(args, infoOrQuery) { 
        return self.delegateSubscription('experienceCategory', args, {}, infoOrQuery)
      },
      amenities(args, infoOrQuery) { 
        return self.delegateSubscription('amenities', args, {}, infoOrQuery)
      },
      review(args, infoOrQuery) { 
        return self.delegateSubscription('review', args, {}, infoOrQuery)
      },
      booking(args, infoOrQuery) { 
        return self.delegateSubscription('booking', args, {}, infoOrQuery)
      },
      payment(args, infoOrQuery) { 
        return self.delegateSubscription('payment', args, {}, infoOrQuery)
      },
      paymentAccount(args, infoOrQuery) { 
        return self.delegateSubscription('paymentAccount', args, {}, infoOrQuery)
      },
      paypalInformation(args, infoOrQuery) { 
        return self.delegateSubscription('paypalInformation', args, {}, infoOrQuery)
      },
      creditCardInformation(args, infoOrQuery) { 
        return self.delegateSubscription('creditCardInformation', args, {}, infoOrQuery)
      },
      message(args, infoOrQuery) { 
        return self.delegateSubscription('message', args, {}, infoOrQuery)
      },
      notification(args, infoOrQuery) { 
        return self.delegateSubscription('notification', args, {}, infoOrQuery)
      },
      restaurant(args, infoOrQuery) { 
        return self.delegateSubscription('restaurant', args, {}, infoOrQuery)
      }
    }
  }
  
  delegate(operation, field, args, context, info) {
    return super.delegate(operation, field, args, context, info)
  }
}