import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student{
    id: String,
    dob: String,
    firstname : String,
    lastname: String,
    mobile: number,
    email:String,
    profileImgUrl :String,
    genderID: string,
    gender: Gender,
    address: Address   
}