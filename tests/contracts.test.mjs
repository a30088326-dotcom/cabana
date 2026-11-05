import test from "node:test";
import assert from "node:assert/strict";
import {
  enquirySchema,
  cabanaSchema,
  settingsSchema,
  seedSettings,
  seedCabanas,
} from "@elara/contracts";
const date = (offset) =>
  new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);
const valid = {
  name: "Test Guest",
  email: "guest@example.com",
  phone: "+94770000000",
  cabanaId: "forest-cabana",
  checkIn: date(2),
  checkOut: date(4),
  guests: 2,
  message: "Test enquiry",
  consent: true,
  website: "",
};
test("shared enquiry validation accepts a valid stay", () =>
  assert.equal(enquirySchema.safeParse(valid).success, true));
test("invalid, reversed and past dates are rejected", () => {
  for (const dates of [
    { checkIn: "2027-02-30" },
    { checkOut: valid.checkIn },
    { checkIn: "2020-01-01", checkOut: "2020-01-02" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...dates }).success,
      false,
    );
});
test("consent and spam trap are enforced", () => {
  assert.equal(
    enquirySchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, website: "spam.example" }).success,
    false,
  );
});
test("content accepts only controlled local image paths", () => {
  assert.equal(settingsSchema.safeParse(seedSettings).success, true);
  assert.equal(
    settingsSchema.safeParse({
      ...seedSettings,
      hero: "https://example.com/pixel.svg",
    }).success,
    false,
  );
  for (const c of seedCabanas)
    assert.equal(cabanaSchema.safeParse(c).success, true);
});
