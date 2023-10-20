import { computed, defineProps } from 'vue';
import { currency } from './filters';

// const props = () => defineProps({
//   delivery: {
//     type: Object,
//     default: null,
//   },
//   estimate: {
//     type: Boolean,
//     default: false,
//   },
//   price: {
//     type: Object,
//     required: true,
//     validator: price => price.sellerPriceVat,
//   },
//   protection: {
//     type: Object,
//     default: null,
//   },
//   gtmLabel: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     default: null,
//     validator: type => ['VO', 'VN', '0K'].includes(type),
//   },
//   takeoverPremiumActive: {
//     type: Boolean,
//     default: false,
//   },
// });

const priceTitle = computed(() => {
  return props.estimate ? this.$t('pdp.price.price.availableSoon') : null;
});

const priceData = computed(() => {
  return props.takeoverPremiumActive
    ? props.price.sellerPriceVatWithTakeoverPremium
    : props.price.sellerPriceVat;
});

const discountData = computed(() => {
  return props.takeoverPremiumActive
    ? props.price.takeoverPremium
    : props.price.discountPriceAmount;
});

const filters = {
  currency,
};

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
  priceTitle,
  priceData,
  discountData,
  filters,
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.delivery)
  }
};
