/**
 * Created by myrto on 9/19/18.
 */
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Provider, Service} from '../domain/eic-model';
import {Observable} from "rxjs";

@Injectable()
export class ServiceProviderService {

  constructor(public http: HttpClient, public authenticationService: AuthenticationService) {
  }
  private base = environment.API_ENDPOINT;
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;charset=UTF-8'
    })
  };

  private options = {withCredentials: true};

  static checkUrl(url: string) {
    if (url !== '') {
      if (!url.match(/^(https?:\/\/.+)?$/)) {
        url = 'http://' + url;
      }
    }
    return url;
  }

  createNewServiceProvider(newProvider: any) {
    return this.http.post(this.base + '/provider', newProvider, this.options);
  }

  updateServiceProvider(updatedFields: any): Observable<Provider> {
    return this.http.put<Provider>(this.base + '/provider', updatedFields, this.options);
  }

  verifyServiceProvider(id: string, active: boolean, status: string) {
    return this.http.patch(`/provider/verifyProvider/${id}?active=${active}&status=${status}`, {});
  }

  getMyServiceProviders() {
    return this.http.get<Provider[]>(this.base + '/provider/getMyServiceProviders', this.options);
  }

  // getMyServiceProviders() {
  //     return this.http.get(`/provider/getMyServiceProviders?email=${this.authenticationService.getUserProperty('email')}`);
  // }

  getServiceProviderById(id: string) {
    return this.http.get<Provider>(this.base + `/provider/${id}`, this.options);
  }

  getServicesOfProvider(id: string) {
    return this.http.get<Service[]>(this.base + `/provider/services/${id}`);
  }

  getPendingServicesOfProvider(id: string) {
    return this.http.get<Service[]>(this.base + `/provider/services/pending/${id}`);
  }

}