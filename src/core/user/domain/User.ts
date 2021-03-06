import {AggregateRoot} from "../../shared/domain/AggregateRoot";
import {Email} from "./Email";
import {Uuid} from "../../shared/domain/Uuid";

export class User extends AggregateRoot {

    private _email: Email;

    constructor(id: Uuid, email: Email) {
        super(id);
        this._email = email;
    }

    get email(): Email {
        return this._email;
    }
}
