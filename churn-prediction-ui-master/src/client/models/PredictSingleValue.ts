/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Binary } from './Binary';
import type { Contract } from './Contract';
import type { Gender } from './Gender';
import type { InternetService } from './InternetService';
import type { MultipleLine } from './MultipleLine';
import type { PaymentMethod } from './PaymentMethod';
import type { Service } from './Service';

/**
 * Schema for prediction of single value
 */
export type PredictSingleValue = {
    customer_id?: (string | null);
    gender: Gender;
    senior_citizen: Binary;
    partner: Binary;
    dependents: Binary;
    tenure: number;
    phone_service: Binary;
    multiple_lines: MultipleLine;
    internet_service: InternetService;
    online_security: Service;
    online_backup: Service;
    device_protection: Service;
    tech_support: Service;
    streaming_tv: Service;
    streaming_movies: Service;
    contract: Contract;
    paperless_billing: Binary;
    payment_method: PaymentMethod;
    monthly_charges: number;
    total_charges: number;
};
