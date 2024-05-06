export interface Ipermission {
    roleId: string
  roleName: string
  roleClaims: RoleClaim[]
}

export interface RoleClaim {
    displayValue: string
    isSelected: boolean
  }