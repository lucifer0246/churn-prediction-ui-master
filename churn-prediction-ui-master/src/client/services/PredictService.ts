/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_predict_multiple_value_predict_upload_file_post } from '../models/Body_predict_multiple_value_predict_upload_file_post';
import type { PredictMultipleValueResult } from '../models/PredictMultipleValueResult';
import type { PredictSingleValue } from '../models/PredictSingleValue';
import type { PredictSingleValueResult } from '../models/PredictSingleValueResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PredictService {

    /**
     * Predict Single Value
     * @returns PredictSingleValueResult Successful Response
     * @throws ApiError
     */
    public static predictSingleValuePredictSingleDatasetPost({
selectedModelId,
requestBody,
}: {
selectedModelId: string,
requestBody: PredictSingleValue,
}): CancelablePromise<PredictSingleValueResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/predict/single-dataset',
            query: {
                'selected_model_id': selectedModelId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Predict Multiple Value
     * @returns PredictMultipleValueResult Successful Response
     * @throws ApiError
     */
    public static predictMultipleValuePredictUploadFilePost({
selectedModelId,
formData,
}: {
selectedModelId: string,
formData: Body_predict_multiple_value_predict_upload_file_post,
}): CancelablePromise<PredictMultipleValueResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/predict/upload-file',
            query: {
                'selected_model_id': selectedModelId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
