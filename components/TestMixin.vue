<template>
  <div class="price-summary">
    <div class="content">
      <base-price
        :discount="discountData"
        :price="priceData"
        :strikethrough-price="price.strikethroughPrice"
        :strikethrough-price-mention-key="strikethroughPriceMentionKey"
        :title="priceTitle"
        :info-tooltip-key="infoTooltipKey"
        class="price-summary-base"
        :type="type"
      />

      <div class="price-summary-cta">
        <button
          v-gtm:click.native="gtmCallbackProductDetailPrice"
          @click="displayDetailsModal = true"
          :aria-labelledby="`${_uid}_linkShowDetailedPrice`"
        >
          <span :id="`${_uid}_linkShowDetailedPrice`">
            {{ $t('pdp.price.price.linkShowDetailedPrice') }}
          </span>
        </button>
      </div>

      <product-price-details-modal
        v-if="displayDetailsModal"
        :price="price"
        :delivery="props.delivery"
        :protection="protection"
        :vehicle-type="type"
        :takeover-premium-active="takeoverPremiumActive"
        :is-vor-price="isVorPrice"
        @close="displayDetailsModal = false"
        @open="$emit('open', { opened: true, title: 'delivery' })"
      />
    </div>

    <label
      for="takeover-premium"
      v-if="price.takeoverPremium"
      class="takeover-premium"
      :class="{ active: takeoverPremiumActive }"
    >
      <valkyrie-switch
        id="takeover-premium"
        class="switch"
        :value="takeoverPremiumActive"
        @input="$emit('update:takeoverPremiumActive', $event)"
      />
      <p class="label">{{ $t('pdp.price.priceDetailed.takeoverPremium') }}</p>
      <p class="value">
        -{{ { value: Math.abs(price.takeoverPremium.value), unit: 'EUR' }
          | filters(null, null, $i18n.locale) }}
      </p>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import BasePrice from '@shared/generic/components/views/BasePrice.vue';
// import ValkyrieSwitch from '@shared/valkyrie/form/views/ValkyrieSwitch.vue';
// import ProductPriceDetailsModal from '@shared/generic/product/views/price/ProductPriceDetailsModal.vue';
import { priceTitle, priceData, discountData, filters } from './price-summary-mixin.js'; // is it a global mixin ? no
// import { currency } from '@shared/generic/common/filters';

const mixin = {
  created() {
    console.log(mixins, 'mixins');
  }
}

console.log('const mixin', mixin);

const displayDetailsModal = ref(false); // data() are now called as ref()

const vnLike = computed(() => {
  return props.type === 'VN' || props.type === '0K';
});

const infoTooltipKey = computed(() => {
  if (props.price.strikethroughPrice && props.price.tooltipEnabled) {
    if (isVorPrice.value || vnLike.value) {
      const key = isVorPrice.value ? 'vor' : 'vn';
      return `pdp.price.price.tooltip.${key}`;
    }
  }
  return null;
});

const strikethroughPriceMentionKey = computed(() => {
  if (props.price.strikethroughPrice && isVorPrice.value) {
    return 'pdp.price.price.strikethroughPriceMention.vor';
  }
  return null;
});

const isVorPrice = computed(() => {
  return props.type === 'VO' && props.price.constructorPriceWithOptions != null;
});

const gtmCallbackProductDetailPrice = () => { // method are just function
  return {
    category: 'navigation',
    action: 'click - detail product price',
    label: props.gtmLabel,
    trackingData: 'productpage',
  };
};
</script>


<!-- 
export default {
  name: 'ProductPriceSummary',
  components: {
    ValkyrieSwitch,
    BasePrice,
    ProductPriceDetailsModal,
  },
  mixins: [
    mixins,
  ],
  data() {
    return {
      displayDetailsModal: false,
    };
  },
  computed: {
    vnLike() {
      return this.type === 'VN' || this.type === '0K';
    },
    infoTooltipKey() {
      if (this.price.strikethroughPrice && this.price.tooltipEnabled) {
        if (this.isVorPrice || this.vnLike) {
          const key = this.isVorPrice ? 'vor' : 'vn';
          return `pdp.price.price.tooltip.${key}`;
        }
      }
      return null;
    },
    strikethroughPriceMentionKey() {
      if (this.price.strikethroughPrice && this.isVorPrice) {
        return 'pdp.price.price.strikethroughPriceMention.vor';
      }
      return null;
    },
    // eslint-disable-next-line
    /* VOR Price: [VO] vehicle [R]econditioned by Aramisauto and eligible for special [Price] display
     * Eligibility rules is less then 4 year, under 80 k km and that price is less than 14% off
     * the constructor price
     */
    isVorPrice() {
      return this.type === 'VO' && this.price.constructorPriceWithOptions != null;
    },
  },
  filters: {
    currency,
  },
};
</script> -->

<style lang="scss" scoped>

.price-summary {
  padding: 12px 8px;
  // background: $color-neutral-10;
  border-radius: 4px;

  .content {
    display: flex;
    align-items: center;
  }

  &-base {
    flex: 1;

    ::v-deep {
      .price-info-tooltip {
        padding-right: 2px;
        padding-left: 2px;
      }

      // @media screen and (min-width: get-breakpoint-size(m) * 1px)
        // and (max-width: get-breakpoint-size(l) - 1px),
        // screen and (max-width: get-breakpoint-size(s) - 1px) {
        .price-info-tooltip {
          padding-left: 0;
        }

        .price-strikethrough {
          margin-left: 4px;
        }

        .price-discount {
          margin-left: 0;
        }
      }
    }
  }

  // &-cta {
  //   button {
  //     // color: $color-blue-4;
  //     background: none;
  //     border: none;
  //     outline: none;
  //     cursor: pointer;

  //     &:hover,
  //     &:focus {
  //       text-decoration: underline;
  //     }
  //   }
  // }
// }

.takeover-premium {
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  // border-top: 1px solid $color-neutral-7;

  // &.active p {
    // color: $color-green-5;
  // }

  .switch {
    margin-right: 8px;
  }

  // .label {
    // font-weight: $font-weight-semi-bold;
  // }

  .value {
    margin-left: auto;
  }
}
</style>
