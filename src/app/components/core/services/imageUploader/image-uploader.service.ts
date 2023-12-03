import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ImageUploaderService {
	private readonly cloud_name = 'dv4fet4rt'
	constructor(private http: HttpClient) { }


	uploadImage(file: File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'cgkziexz');

			fetch(`https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`, {
				method: 'POST',
				body: formData
			})
				.then(response => response.json())
				.then(data => {
					const imageUrl = data.secure_url;
					console.log(imageUrl);
					resolve(imageUrl);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
}
