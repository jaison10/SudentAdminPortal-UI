import { Address } from "cluster";
import { Gender } from "./gender.model";

export interface Student{
    id: String,
    dob: String,
    firstname : String,
    lastname: String,
    mobile: number,
    profileImgUrl :String,
    genderID: string,
    gender: Gender,
    address: Address   
}