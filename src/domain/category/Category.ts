import {AggregateRoot} from "../shared/base/AggregateRoot";
import {Uuid} from "../shared/uuid/Uuid";
import {CategoryTitle} from "./CategoryTitle";

export class Category extends AggregateRoot {
    private _title: CategoryTitle;

    constructor(id: Uuid, title: CategoryTitle) {
        super(id);
        this._title = title;
    }

    get title(): CategoryTitle {
        return this._title;
    }
}
