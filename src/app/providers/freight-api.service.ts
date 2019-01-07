import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { plainToClass, Expose, Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsEnum } from 'class-validator';
import * as pbi from 'adal-angular';
import { stringify } from '../../../node_modules/@angular/core/src/util';


export class CargoWiseFilter {
  constructor(readonly Name: string, readonly DatabaseColumnName: string, readonly Value: string) {}
}

@Exclude()
export class EventTopic {
  $id: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  private subscribers: number;

  get isSubscribed() {
    return this.subscribers > 0;
  }
  set isSubscribed(isSubscribed: boolean) {
    this.subscribers = Number(isSubscribed);
  }
}

@Exclude()
export class Reference {
  @Expose()
  Value: string;
  @Expose()
  Key: string;
 }

@Exclude()
export class Organization {
  @Expose()
  OH_PK: string;
  // references: Reference[];
  @Expose()
  organizationType: number;
  @Expose()
  name: string;
  @Expose()
  OrganizationCode: string;
  @Expose()
  description: string;
  // Addresses: Address[];
  // customValues: CustomValue[];
  @Expose()
  OH_IsConsignee: string;
  @Expose()
  OH_IsConsignor: string;
  @Expose()
  OH_IsTransportClient: string;
  @Expose()
  OH_IsShippingProvider: string;
  @Expose()
  OH_IsActive: string;
}

@Exclude()
export class ShipmentEvent {
  $id: string;
  @Expose()
  Id: number;
  @Expose()
  ConsigneeCode: string;
  @Expose()
  Consignee: string;
  @Expose()
  ConsignorCode: string;
  @Expose()
  Consignor: string;
  @Expose()
  EventCode: string;
  @Expose()
  ShipmentNo: string;
  @Expose()
  EventDescription: string;
  @Expose()
  AdditionalInfo: string;
  @Expose()
  @Type(() => Date)
  ActualDate: Date;
  @Expose()
  @Type(() => Date)
  EstimatedDate: Date;
  @Expose()
  @Type(() => Date)
  CreateDateTime: Date;
}

@Exclude()
export class FreightMilestone {
  @Expose()
  Status: string;
  @Expose()
  HouseBill: string;
  @Expose()
  TransportMode: string;
  @Expose()
  ConsigneeRef: string;
  @Expose()
  ShipmentRef: string;
  @Expose()
  PortOfLoading: string;
  @Expose()
  Shipper: string;
  @Expose()
  Consignee: string;
  @Expose()
  Origin: string;
  @Expose()
  Destination: string;
  @Expose()
  EstimatedDeparture: string;
  @Expose()
  PortOfDischarge: string;
  @Expose()
  EstimatedDelivery: string;
  @Expose()
  CargoBooked: string;
  @Expose()
  Pickup: string;
  @Expose()
  ActualDeparture: string;
  @Expose()
  ImportCustomsClearance: string;
  @Expose()
  TruckerNotified: string;
  @Expose()
  ActualDelivery: string;
  @Expose()
  ParcelDelivered: string;
  @Expose()
  Inco: string;
  @Expose()
  Weight: number;
  @Expose()
  Volume: number;
  @Expose()
  WeightUnit: string;
  @Expose()
  VolumeUnit: string;
  @Expose()
  LocalClient: string;
  @Expose()
  @Type(() => Date)
  JS_SystemCreateTimeUtc: Date;
}

@Exclude()
export class Milestone {
  @Expose()
  MilestoneType: string;
  @Expose()
  Sequence: number;
  @Expose()
  @Type(() => Date)
  ActualDate: Date;
  @Expose()
  @Type(() => Date)
  EstimatedDate: Date;
  @Expose()
  EventCode: string;
  @Expose()
  Description: string;
}

export enum DeliveryMode {
  CYCY = 0,
  CYCFS = 1,
  CFSCY = 2,
  CFSCFS = 3,
  None = 4
}

export enum StatusType {
  NEW = 0,
  UPDATE = 1,
  CANCEL = 2,
  VIEW = 3,
}



@Exclude()
export class OrderLine {
  @Expose()
  Description: string;
  @Expose()
  LineStatus: string;

  @Expose()
  PartNo: string;
  @Expose()
  OuterPacks: number;
  @Expose()
  OuterPackType: string;
  @Expose()
  Quantity: number;
  @Expose()
  QuantityUnit: string;
  @Expose()
  InnerPacks: number;
  @Expose()
  InnerPackType: string;
  @Expose()
  QuantityInvoiced: number;
  @Expose()
  ItemPrice: number;
  @Expose()
  TotalLinePrice: number;
  @Expose()
  TotalInnerPacks: number;
  @Expose()
  QuantityRecieved: number;
  @Expose()
  RequiredInStore: string;
  @Expose()
  IncoTerms: string;
  @Expose()
  AdditionalTerms: string;
  @Expose()
  ConfirmationNumber: string;
  @Expose()
  ConfirmationDate: string;
  @Expose()
  RequiredExWorks: string;
  @Expose()
  CommercialInvoiceNumber: string;
  @Expose()
  AdditionalInfo: string;

  @Expose()
  Weight: number;
  @Expose()
  WeightUnit: string;

  @Expose()
  Volume: number;
  @Expose()
  VolumeUnit: string;

  @Expose()
  ContainerNumber: string;
  @Expose()
  ContainerPackingOrder: string;

  // References: Reference[];

  @Expose()
  SkuCode: string;
  @Expose()
  AltSkuCode: string;
  @Expose()
  ItemCode: string;
  @Expose()
  Currency: string;

  @Expose()
  LineNumber: number;
  @Expose()
  isPacked: boolean;

  // Circular reference?:
  // @Expose()
  // @Type(() => Container)
  // Container: Container;

  @Expose()
  LineSequence: number;
  @Expose()
  Size: string;
  @Expose()
  Colour: string;

  // CustomValues: CustomValue[];
}

@Exclude()
export class Order {
  @Expose()
  OrderNumber: string;
  @Expose()
  OrderStatus: string;
  @Expose()
  ShipDecNo: string;
  @Expose()
  @Type(() => Date)
  OrderDate: Date;
  @Expose()
  BuyerCode: string;
  @Expose()
  @Type(() => Organization)
  Buyer: Organization;
  @Expose()
  @Type(() => Organization)
  Supplier: Organization;
  @Expose()
  SupplierCode: string;
  @Expose()
  TransportMode: string;
  @Expose()
  ContainerMode: string;
  /**
   * Called GoodsOrigin in CW Screen.
   * @value
   * The port of loading.
   */
  @Expose()
  GoodsOriginPort: string;
  /**
   * Called GoodsDest in CW Screen.
   * @value
   * The port of loading.
   */
  @Expose()
  GoodsDestinationPort: string;
  /**
   * Called LoadPort in CW Screen.
   * @value
   * The port of loading.
   */
  @Expose()
  PortOfLoading: string;
  /**
   * Called DischargePort in CW screen
   * @value
   * The port of discharge.
   */
  @Expose()
  PortOfDischarge: string;
  @Expose()
  Packs: string;
  @Expose()
  PackType: string;
  @Expose()
  Volume: string;
  @Expose()
  UnitOfVolume: string;
  @Expose()
  ConfirmationNumber: string;
  @Expose()
  @Type(() => Date)
  ConfirmationDate: Date;
  @Expose()
  SupplierInvoiceNumber: string;
  @Expose()
  @Type(() => Date)
  SupplierInvoiceDate: Date;
  @Expose()
  @Type(() => Date)
  ExWorksRequiredBy: Date;
  @Expose()
  @Type(() => Date)
  DeliveryRequiredBy: Date;
  @Expose()
  GoodsDescription: string;
  @Expose()
  Currency: string;
  @Expose()
  CurrencyRate: number;
  @Expose()
  ServiceLevel: string;
  @Expose()
  IncoTerms: string;
  @Expose()
  AdditionalTerms: string;
  @Expose()
  OrderNumberSplit: string;
  @Expose()
  CountryOfOrigin: string;
  // References: Reference[];
  // Milestones: Milestone[];
  // Hazards: Hazard[];
  @Expose()
  MarksAndNumbers: string;
  @Expose()
  SpecialInstructions: string;
  @Expose()
  CreatedBy: string;
  @Expose()
  @Type(() => Date)
  EstimatedArrival: Date;
  @Expose()
  @Type(() => Date)
  EstimatedDeparture: Date;
  @Expose()
  @Type(() => Date)
  ActualArrival: Date;
  @Expose()
  @Type(() => Date)
  ActualDeparture: Date;
  @Expose()
  @Type(() => Date)
  CancelDate: Date;
  @Expose()
  Department: string;
  @Expose()
  @Type(() => OrderLine)
  OrderLines: OrderLine[];
  @Expose()
  @Type(() => Organization)
  Organizations: Organization[];
  // CustomValues: CustomValue[];
}



@Exclude()
export class Container {
  // references: Reference[];
  @Expose()
  @Type(() => Milestone)
  milestones: Milestone[];
  @Expose()
  @IsNotEmpty()
  @IsEnum(StatusType)
  status: StatusType;
  @Expose()
  containerNumber: string;
  @Expose()
  sealNumber: string;
  @Expose()
  @Type(() => OrderLine)
  orderLines: OrderLine[];
  @Expose()
  containerType: string;
  @Expose()
  containerDescription: string;
  @Expose()
  containerMode: string;
  @Expose()
  @IsNotEmpty()
  @IsEnum(DeliveryMode)
  deliveryMode: DeliveryMode;
  // customValues: CustomValue[];
}

export enum TransportLegType {
  MAIN = 0,
  FEEDER = 1,
  OTHER = 2,
  PreCarriage = 3,
  LocalTransport = 4,
  Flight1 = 5,
  Flight2 = 6,
  Flight3 = 7,
}

export enum ModeType {

  // TRANSPORT
  SEA = 0,
  AIR = 1,
  ROA = 2,
  RAI = 3,

  // CONTAINER
  LCL,
  FCL
}

@Exclude()
export class TransportLeg {
  @Expose()
  @Type(() => Date)
  estimatedArrival: Date;
  @Expose()
  @Type(() => Date)
  estimatedDeparture: Date;
  @Expose()
  @Type(() => Date)
  actualArrival: Date;
  @Expose()
  @Type(() => Date)
  actualDeparture: Date;
  @Expose()
  portOfDischarge: string;
  @Expose()
  portOfLoading: string;
  @Expose()
  voyageNumber: string;
  @Expose()
  vesselName: string;
  @Expose()
  @IsNotEmpty()
  @IsEnum(ModeType)
  transportMode: ModeType;
  @Expose()
  @IsNotEmpty()
  @IsEnum(TransportLegType)
  legType: TransportLegType;
  @Expose()
  @Type(() => Organization)
  carrier: Organization;
  // customValues: CustomValue[];
  @Expose()
  VesselLloydsIMO: string;
}

@Exclude()
export class Shipment {
  @Expose()
  ShipmentNo: string;
  @Expose()
  @Type(() => Organization)
  Client: Organization;
  @Expose()
  @Type(() => Organization)
  Shipper: Organization;
  @Expose()
  @Type(() => Organization)
  Consignee: Organization;
  /**
   * Field is called Mode on CW booking screen.
   * @value
   * The container mode.
   */
  @Expose()
  ContainerMode: string;
  @Expose()
  incoTerm: string;
  /**
   * Field is called Service Level on CW booking screen.
   * @value
   * The awb service level.
   */
  @Expose()
  AWBServiceLevel: string;
  /**
   * Field is called Shippers Ref on CW booking screen.
   * @value
   * The booking confirmation reference.
   */
  @Expose()
  BookingConfirmationReference: string;
  @Expose()
  GoodsDescription: string;
  @Expose()
  MarksAndNumbers: string;
  /**
   * Field is called Charge Apply on CW booking screen.
   * @value
   * The hblawb charges display.
   */
  @Expose()
  HBLAWBChargesDisplay: string;
  @Expose()
  PortOfOrigin: string;
  @Expose()
  PortOfDestination: string;
  @Expose()
  PortOfLoading: string;
  @Expose()
  PortOfDischarge: string;
  @Expose()
  @Type(() => Organization)
  Carrier: Organization;
  @Expose()
  EstimatedPickup: string;
  @Expose()
  EstimatedDelivery: string;
  @Expose()
  PickupRequiredBy: string;
  @Expose()
  DeliveryRequiredBy: string;
  /**
   * Field is called Div drop on CW booking screen.
   * @value
   * The FCL delivery equipment needed.
   */
  @Expose()
  FCLDeliveryEquipmentNeeded: string;
  /**
   * Field is called Pic drop on CW booking screen.
   * @value
   * The FCL pickup equipment needed.
   */
  @Expose()
  FCLPickupEquipmentNeeded: string;
  @Expose()
  weight: number;
  @Expose()
  weightUnit: string;
  @Expose()
  volume: number;
  @Expose()
  volumeUnit: string;
  @Expose()
  GoodsValue: string;
  @Expose()
  GoodsValueCurrency: string;
  @Expose()
  SpotRate: string;
  @Expose()
  SpotRateCurrency: string;
  // PackingLines: PackingLine[];
  @Expose()
  VesselName: string;
  @Expose()
  VoyageFlightNo: string;
  // references: Reference[];

  @Expose()
  @Type(() => Milestone)
  milestones: Milestone[];
  // hazards: Hazard[];
  // organizations: Organization[];
  @Expose()
  status: string;
  @Expose()
  transportMode: string;
  @Expose()
  @Type(() => TransportLeg)
  transportLegs: TransportLeg[];
  @Expose()
  @Type(() => Container)
  containers: Container[];
  @Expose()
  @Type(() => Order)
  orders: Order[];
  @Expose()
  @Type(() => Organization)
  organizations: Organization[];
  @Expose()
  @Type(() => Reference)
  references: Reference[];
  @Expose()
  ShipmentNumber: string;
  @Expose()
  ReferenceAll: string;
  
  
}

@Exclude()
export class Profile {
  @Expose()
  ProfileId: number;
  @Expose()
  CustomerName: string;
  @Expose()
  CargoWiseCode: string;
}

@Exclude()
export class ApplicationUser {
  @Expose()
  public FirstName: string;
  @Expose()
  public LastName: string;
  @Expose()
  public ProfileId: number;
  @Expose()
  @Type(() => Profile)
  public Profiles: Profile[];
}

export class AuthResult {
  IsAuthSuccessful: boolean;
  User: ApplicationUser;
}

class SuccessAuthResult extends AuthResult {
  constructor (user: ApplicationUser) {
    super();
    this.IsAuthSuccessful = true;
    this.User = user;
  }
}

class FailAuthResult extends AuthResult {
  constructor () {
    super();
    this.IsAuthSuccessful = false;
    this.User = null;
  }
}

@Exclude()
export class PowerBISettings {
    @Expose()
    public UserID: string;
    @Expose()
    public ReportID: string;
    @Expose()
    public RoleName: string;
    @Expose()
    public WorkspaceID: string;
    @Expose()
    public StationCode: string;
  }

  @Exclude()
  export class EmbedToken {
    @Expose()
    public token: string;
  }

  @Exclude()
  export class EmbedConfig {
    @Expose()
    public Password: string;
    @Expose()
    public Id: string;
    @Expose()
    public EmbedUrl: string;
    @Expose()
    public MinutesToExpiration: number;
    @Expose()
    public IsEffectiveIdentityRolesRequired: boolean;
    @Expose()
    public IsEffectiveIdentityRequired: boolean;
    @Expose()
    public EnableRLS: boolean;
    @Expose()
    public Username: string;
    @Expose()
    public Roles: string;
    @Expose()
    public ErrorMessage: string;
    @Expose()
    @Type(() => EmbedToken)
    public EmbedToken: EmbedToken;
}
  

// Position of sea vessel (Response from MarineTraffice/VesselFinder):
@Exclude()
export class Position {
  @Expose()
  LAT: string;
  @Expose()
  LON: string;
}

@Exclude()
export class Geography {
  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  altitude: number;

  @Expose()
  direction: number;
}

// Position of aircraft (Response from AviationEdge / FlightAware):
@Exclude()
export class AircraftPosition {
  @Expose()
  @Type(() => Geography)
  geography: Geography;
}

// Class returned by GetIMONumbers (differs from TransportLeg type referenced in the Shipment type):
@Exclude()
export class TransportLegResult {
  @Expose()
  ShipmentNumber: string;
  @Expose()
  IMONumber: string;
  @Expose()
  VesselName: string;
  @Expose()
  Sequence: string;
  @Expose()
  Type: string;
  @Expose()
  @Type(() => Date)
  ATA: Date;
  @Expose()
  @Type(() => Date)
  ATD: Date;
}

@Exclude()
export class PortDetail {
    @Expose()
    Id: number;
    @Expose()
    Name: string;
    @Expose()
    Latitude: string;
    @Expose()
    Longitude: string;
    @Expose()
    Country: string;
    @Expose()
    Code: string;
}

@Injectable({
  providedIn: 'root'
})
export class FreightApiService {

  constructor(public http: HttpClient) { }

  /**
   * GetEventSubscriptions
   */
  public GetEventSubscriptions(theUserName: string): Observable<EventTopic[]> {

    console.log('FreightApiService: Get event subscriptions.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetEventSubscriptions';

    const params = new HttpParams()
      .set('userName', theUserName);

    return this.http
    .get(endpoint, {params})
    .pipe(map(response => {
      const topics = response['topics'];

      return plainToClass(EventTopic, topics);
      // return topics.map((topic) => new EventTopic(topic));
    }));
    // .pipe(catchError(error => {
    //       console.log(`Failed request for Subscriptions. Details: ${error}`);

    //       return of(new Array<EventTopic>());
    //     }
    //   ));
  }

  public GetShipmentEvents(cargoWiseCode: string, theUserName: string): Observable<ShipmentEvent[]> {

    console.log('FreightApiService: Get shipment events.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipmentEvents';

    const params = new HttpParams()
      .set('cargowisecode', cargoWiseCode)
      .set('userName', theUserName);

    return this.http
    .get(endpoint, {params})
    .pipe(map((events: object[]) => {

      return plainToClass(ShipmentEvent, events);
    }));
  }

  public GetShipments(cargoWiseCode: string,
    shipmentNo: string,
    orderNo: string,
    fromDate: Date,
    toDate: Date,
    includeOpenShipments: boolean): Observable<FreightMilestone[]> {

    console.log('FreightApiService: Get shipments.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipments';

    const filters = new Array<CargoWiseFilter>();
      filters.push(new CargoWiseFilter('cargowisecode', 'cargowisecode', cargoWiseCode));
      filters.push(new CargoWiseFilter('shipmentNumber', 'shipmentNumber', shipmentNo));
      filters.push(new CargoWiseFilter('orderNumber', 'orderNumber', orderNo));
      filters.push(new CargoWiseFilter('DateFrom', 'DateFrom', fromDate != null ? fromDate.toDateString() : ''));
      filters.push(new CargoWiseFilter('DateTo', 'DateTo', toDate != null ? toDate.toDateString() : ''));
      filters.push(new CargoWiseFilter('OpenShipments', 'OpenShipments', includeOpenShipments ? '1' : '0'));

    const params = new HttpParams()
      .set('parameters', JSON.stringify(filters));

    return this.http
    .get(endpoint, {params})
    .pipe(map((result: object[]) =>  {

      return plainToClass(FreightMilestone, result['Items']);
    }));
  }

  public GetShipment(shipmentNo: string): Observable<Shipment> {

    console.log('FreightApiService: Get [single] shipment.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipment';

    const params = new HttpParams()
      .set('shipmentNo', shipmentNo);

    return this.http
    .get(endpoint, {params})
    .pipe(map((res: object) => {
      return plainToClass(Shipment, res);
    }));  
}

  public SubscribeToShipmentEvents (topics: EventTopic[], theUserName: string): Observable<boolean> {

    console.log('FreightApiService: Subscribe to shipment events.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/SubscribeToShipmentEvents';

    const body = {
      userName: theUserName,
      eventCodes: topics
        .filter(topic => topic.isSubscribed)
        .map(topic => topic.code)
    };

    return this.http
      .post(endpoint, body)
      .pipe(map(response => !!response)); // Return isSuccessful.
  }

  public Authenticate(username: string, password): Observable<AuthResult> {

    console.log('FreightApiService: Get [single] shipment.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/auth';

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http
    .get(endpoint, {params})
    .pipe(map((response) => {
      // Shouldn't get here if server returns 401/405 authentication error.
      // But just to be safe, add additional check:
      if (response.hasOwnProperty('Message') && !!response['Message']) {

        return new FailAuthResult();

      } else {
        return new SuccessAuthResult(plainToClass(ApplicationUser, response));
      }

    }));
  }

   public GetPowerBiReport (powerBISettings: PowerBISettings): Observable<EmbedConfig> {

    console.log('FreightApiService: retrieve powerbi report.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetBIReport';

    const body = powerBISettings;

    return this.http
      .post(endpoint, body)
      .pipe(map((res: object) => {
        return plainToClass(EmbedConfig, res);
      }));
  }

  public GetShipGeoLoc(imoNo: string): Observable<Position> {

    console.log('FreightApiService: Get ship location.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetShipGeoLoc';

    const params = new HttpParams()
      .set('imoNo', imoNo);

    return this.http
    .get(endpoint, {params})
    .pipe(map((res: object[]) => {
      return plainToClass(Position, res[0]);
    }));
  }

  public GetAirlineGeoLoc(iataNo: string): Observable<AircraftPosition> {

    console.log('FreightApiService: Get aircraft location.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetAirlineGeoLoc';

    const params = new HttpParams()
      .set('Iata', iataNo);

    return this.http
    .get(endpoint, {params})
    .pipe(map((res: object) => {
      return plainToClass(AircraftPosition, res);
    }));
  }

  public GetIMONumbers(shipmentNo: string): Observable<TransportLegResult[]> {
    // Only allow a single shipment number for now.

    console.log('FreightApiService: Get IMO numbers for shipment.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetIMONumbers';

    const params = new HttpParams()
      .set('ShipmentpNumbers', shipmentNo);

    return this.http
    .get(endpoint, {params})
    .pipe(map((res: object[]) => {
      return plainToClass(TransportLegResult, res);
    }));
  }

  public GetPortDetails(portCodes: string[]): Observable<PortDetail[]> {

    console.log('FreightApiService: Get port details for specified port codes.');

    const endpoint = environment.freightApiUrl + 'FreightShipping/GetPortDetails';

    const params = new HttpParams()
      .set('portCodes', portCodes.join(','));

    return this.http
    .get(endpoint, {params})
    .pipe(map((res: object[]) => {
      return plainToClass(PortDetail, res);
    }));
  }

}
