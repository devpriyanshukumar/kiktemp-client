import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config;

  constructor(
    private http: HttpClient) {
    this.config = new Config();
  }

  public getConfig(): Config {
    return this.config;
  }

  load(url: string): Promise<Config> {
    const promise = this.http.get(url)
      .toPromise()
      .then((settings: Config | undefined) => {
        if (settings) {
          this.config = settings;
        }
        return this.config;
      });

    return promise;
  }
}

export class Config {
  [name: string]: any;
}