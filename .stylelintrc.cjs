module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-clean-order"
  ],
  rules: {
    "max-nesting-depth": 3,
    "color-hex-length": "short", 
    "selector-class-pattern": null,
    "selector-id-pattern": null, 
    "value-no-vendor-prefix": null,
    "property-no-vendor-prefix": null, 
  }
};