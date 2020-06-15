import {Injectable} from '@angular/core';
import {BasicUser} from '../models/Model';


@Injectable({providedIn: 'root'})
export class MemberService {
  public members: BasicUser[] = [];

  public member: BasicUser;

  public get isMemberActive(): boolean {
    return this.member !== undefined;
  }

  public isProcessing = false;

  constructor() {
  }

  public getBook(bookId: string) {
  }
}
