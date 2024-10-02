/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_dataset_train_upload_dataset_post } from '../models/Body_upload_dataset_train_upload_dataset_post';
import type { GetAllModelsInformationResponse } from '../models/GetAllModelsInformationResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrainService {

    /**
     * Train Model
     * @returns any Successful Response
     * @throws ApiError
     */
    public static trainModelTrainTrainModelGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/train/train-model',
        });
    }

    /**
     * Upload Dataset
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadDatasetTrainUploadDatasetPost({
formData,
}: {
formData: Body_upload_dataset_train_upload_dataset_post,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/train/upload-dataset',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Models
     * @returns GetAllModelsInformationResponse Successful Response
     * @throws ApiError
     */
    public static getAllModelsTrainGetAllModelsGet(): CancelablePromise<GetAllModelsInformationResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/train/get-all-models',
        });
    }

}
