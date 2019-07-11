export class AbsUser {
    private _enterprise_name: string;
    private _store_name: string;
    constructor(ent: string, store: string) {
        this._enterprise_name = ent;
        this._store_name = store;
    }

    public get enterprise_name() {
        return this._enterprise_name;
    }

    public get store_name() {
        return this._store_name;
    }
}
