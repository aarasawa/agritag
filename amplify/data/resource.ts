import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    pesticide: a.model({
      use_no: a.string(),
      prodno: a.string(),
      chem_code: a.string(),
      prodchem_pct: a.float(),
      lbs_chm_used: a.float(),
      lbs_prd_used: a.float(),
      amt_prd_used: a.float(),
      unit_of_meas: a.string(),
      acre_planted: a.float(),
      unit_planted: a.string(),
      acre_treated: a.float(),
      unit_treated: a.string(),
      applic_cnt: a.float(),
      applic_dt: a.string(),
      applic_time: a.string(),
      county_cd: a.string(),
      base_ln_mer: a.string(),
      township: a.string(),
      tship_dir: a.string(),
      range: a.string(),
      range_dir: a.string(),
      section: a.string(),
      site_loc_id: a.string(),
      grower_id: a.string(),
      license_no: a.string(),
      planting_seq: a.string(),
      aer_gnd_ind: a.string(),
      site_code: a.string(),
      qualify_cd: a.string(),
      batch_no: a.string(),
      document_no: a.string(),
      summary_cd: a.string(),
      record_id: a.string(),
      comtrs: a.string(),
      error_flag: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema, 
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  }
})