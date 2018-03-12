import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable()
export class FileService {

  constructor(public sanitizer: DomSanitizer) {}

  sanitize(contentType: string, bytes: ByteString) : SafeUrl {
   return this.sanitizer.bypassSecurityTrustUrl(`data:${contentType};base64,${bytes}`);
  }

}