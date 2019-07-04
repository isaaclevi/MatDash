export class User{
    private _enterprise_name: string;
    private _store_name: string;
    private _compudash_ver: string;
    private _Modified: string;
    private _Checked: string;
    private _db_ver: string;
    private _Tis01_ver: string;
    private _TisWin3_ver: string;
    private _Tis01_DTOS: string;
    private _Tis01_ver_date: string;
    private _Active_Registers: number;
    private _Tmpcalc_Size: string;
    private _public_ip: string;
    private _CC_Engine: string;
    private _action: string;

    get enterprise_name() {
        return this._enterprise_name;
    }

    get store_name() {
        return this._store_name;
    }
    get compudash_ver() {
        return this._compudash_ver;
    }
    get Modified() {
        return this._Modified;
    }
    get Checked() {
        return this._Checked;
    }
    get db_ver() {
        return this._db_ver;
    }
    get Tis01_ver() {
        return this._Tis01_ver;
    }
    get TisWin3_ver() {
        return this._TisWin3_ver;
    }
    get Tis01_DTOS() {
        return this._Tis01_DTOS;
    }
    get Tis01_ver_date() {
        return this._Tis01_ver_date;
    }
    get Active_Registers() {
        return this._Active_Registers;
    }
    get Tmpcalc_Size() {
        return this._Tmpcalc_Size;
    }
    get public_ip() {
        return this._public_ip;
    }
    get CC_Engine() {
        return this._CC_Engine;
    }
    get action() {
        return this._action;
    }
}
