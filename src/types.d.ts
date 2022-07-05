declare module "multi-ini" {
  export function read(str: string): any;
}

type AWSConfigItem = {
  title: string
  account: string
  roleName: string
  color?: string
  region?: string
}

type AWSConfig = AWSConfigItem[]
