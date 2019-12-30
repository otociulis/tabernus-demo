import { writable } from 'svelte/store';

export const LIST_VIEW_MODE = 0;
export const GRID_VIEW_MODE = 1;

export const viewMode = writable(
  typeof window === 'undefined' ? LIST_VIEW_MODE : undefined
);

export const ONLY_NEW_ITEMS_FILTER = 0x01;
export const ONLY_ON_SALE_FILTER = 0x02;
export const ONLY_ON_AVAILABLE_FILTER = 0x04;

export const filters = writable(
  typeof window === 'undefined' ? 0 : undefined
);

export const sortField = writable(
  typeof window === 'undefined' ? 'name' : undefined
);

export const SORT_DIRECTION_ASC = 0;
export const SORT_DIRECTION_DESC = 1;

export const sortDirection = writable(
  typeof window === 'undefined' ? SORT_DIRECTION_ASC : undefined
);

export const search = writable();

export const basket = writable();
export const basketDefaultValue = [];
export const selectedPaymentId = writable();

export const CHECKOUT_TYPE_PRIVATE_PARTY = 0;
export const CHECKOUT_TYPE_COMPANY = 1;

export const checkout = writable();

export const checkoutDefaultValue = {
  type: CHECKOUT_TYPE_PRIVATE_PARTY,
  formData: {}
};

export const searchKeyword = writable('');

export const config = writable({});