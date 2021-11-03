import { BookingItem } from '../../shared/booking-form.model';
Object.defineProperty(BookingItem.prototype, 'revoked', {
    get: function (this: BookingItem) {
        return this.status == 'REVOKED';
    },
    enumerable: true,
    configurable: true,
});
