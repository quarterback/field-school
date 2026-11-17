export type ServiceKey =
  | "recreation" | "license" | "housing" | "library" | "water" | "requests"
  | "transit" | "school" | "authority" | "state" | "court" | "hospital" | "family";

export type ResidentKey = "maya" | "avery" | "helen" | "samira" | "custom";

export type ResidentAccount = {
  id: string;
  first: string;
  last: string;
  email: string;
  address: string;
  postal: string;
  created: string;
};

export type DemoResident = {
  key: Exclude<ResidentKey, "custom">;
  age: number;
  context: string;
  account: ResidentAccount;
  services: ServiceKey[];
};

export const DEMO_RESIDENTS: DemoResident[] = [
  {
    key: "maya",
    age: 39,
    context: "Parent and business owner",
    account: {
      id: "ED-2030-00482",
      first: "Maya",
      last: "Rivera",
      email: "maya.rivera@example.org",
      address: "14 Example Lane, Old Watkins",
      postal: "80137",
      created: "2030-09-11",
    },
    services: [
      "recreation", "license", "housing", "requests", "library", "water",
      "transit", "school", "authority",
    ],
  },
  {
    key: "avery",
    age: 22,
    context: "Renter and transit rider",
    account: {
      id: "ED-2030-00513",
      first: "Avery",
      last: "Chen",
      email: "avery.chen@example.org",
      address: "9 Example Court, Watkins Junction",
      postal: "80137",
      created: "2030-10-06",
    },
    services: ["requests", "library", "transit"],
  },
  {
    key: "helen",
    age: 72,
    context: "Homeowner and recreation member",
    account: {
      id: "ED-2030-00176",
      first: "Helen",
      last: "Carter",
      email: "helen.carter@example.org",
      address: "48 Example Road, Old Watkins",
      postal: "80137",
      created: "2030-03-22",
    },
    services: ["recreation", "requests", "library", "water"],
  },
  {
    key: "samira",
    age: 29,
    context: "New parent",
    account: {
      id: "ED-2030-00645",
      first: "Samira",
      last: "Ortiz",
      email: "samira.ortiz@example.org",
      address: "23 Example Way, Colfax East",
      postal: "80018",
      created: "2030-11-10",
    },
    services: ["family", "requests"],
  },
];

export const DEMO_IDS = DEMO_RESIDENTS.map(person=>person.key);

export function getDemoResident(key: string) {
  return DEMO_RESIDENTS.find(person=>person.key===key);
}

export function hasResidentService(key: string, service: ServiceKey) {
  return Boolean(getDemoResident(key)?.services.includes(service));
}

export function getResidentLabel(key: string) {
  const person = getDemoResident(key);
  return person ? person.account.first+" "+person.account.last : "New account";
}

/** Only required record references appear on resident pages; demo ages stay in the walkthrough. */
export function residentRecords(key: string) {
  switch (key) {
    case "helen":
      return {
        parkPass: "REC-2030-0186",
        parkThrough: "March 31, 2031",
        libraryCard: "LIB-2030-0154",
        libraryItem: "Birds of the Front Range",
        libraryBranch: "Watkins Public Library",
        waterAccount: "WSA-2030-00174",
        waterAddress: "48 Example Road, Old Watkins, CO 80137",
        waterBalance: "$47.65",
        transitCard: "",
      };
    case "avery":
      return {
        parkPass: "",
        parkThrough: "",
        libraryCard: "LIB-2030-0341",
        libraryItem: "A Guide to Colorado Trails",
        libraryBranch: "Watkins Junction Branch",
        waterAccount: "",
        waterAddress: "",
        waterBalance: "",
        transitCard: "6130",
      };
    default:
      return {
        parkPass: "REC-2030-2048",
        parkThrough: "March 31, 2031",
        libraryCard: "LIB-2030-0924",
        libraryItem: "Colorado Road Atlas",
        libraryBranch: "Watkins Public Library",
        waterAccount: "WSA-2030-00821",
        waterAddress: "14 Example Lane, Old Watkins, CO 80137",
        waterBalance: "$82.40",
        transitCard: "4821",
      };
  }
}
