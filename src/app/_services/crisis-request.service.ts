import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, CrisisRequest, CrisisInfo,CrisisInfos } from '@/_models';

@Injectable({ providedIn: 'root' })
export class CrisisRequestService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<CrisisInfos>(`${config.apiUrl}/crisis/all`);
    }

    save(crisisRequest: CrisisRequest) {
      console.log(crisisRequest);
        return this.http.post(`${config.apiUrl}/crisis`, crisisRequest);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}
