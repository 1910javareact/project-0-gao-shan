import { User } from "./models/user"
import { Role } from "./models/role"
import { Receipt } from "./models/receipt"
import { RType } from "./models/receipt-type"
import { RStatus } from "./models/receipt-status"


export let roles = [
    new Role(0, "Admin")
]

export let users = [
    new User(0, "aa", "bb", "cc", "dd", "ee", roles[0])
]

export let rtypes = [
    new RType(0, "Food")
]

export let rstatus = [
    new RStatus(0, "Pending")
]

export let receipt = [
    new Receipt(0, users[0], 0, 0, 0, "asdf", rstatus[0], rtypes[0])
]

