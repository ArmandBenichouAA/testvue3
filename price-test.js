import { numeric } from '@shared/generic/common/filters';

export default {
  props: {
    delivery: {
      type: Object,
      default: null,
    },
    estimate: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Object,
      required: true,
      validator: price => price.sellerPriceVat,
    },
    protection: {
      type: Object,
      default: null,
    },
    gtmLabel: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: null,
      validator: type => ['VO', 'VN', '0K'].includes(type),
    },
    takeoverPremiumActive: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    numeric,
  },
  computed: {
    priceTitle() {
      return this.estimate ? this.$t('pdp.price.price.availableSoon') : null;
    },
    priceData() {
      return this.takeoverPremiumActive
        ? this.price.sellerPriceVatWithTakeoverPremium
        : this.price.sellerPriceVat;
    },
    discountData() {
      return this.takeoverPremiumActive
        ? this.price.takeoverPremium
        : this.price.discountPriceAmount;
    },
  },
};
