"use client";
import Button from "@/src/components/atom/button/button";
import InputField from "@/src/components/atom/inputField/inputField";
import Line from "@/src/components/atom/line/line";
import InputHolder from "@/src/components/molecules/inputHolder/inputHolder";
import SelectInput from "@/src/components/molecules/select/select";
import { MdEdit } from "react-icons/md";

export default function EditUserParent() {
  const qualification = [
    { label: "MD - Doctor of Medicine", value: "MD", key: "med_qual_1" },
    {
      label: "DO - Doctor of Osteopathic Medicine",
      value: "DO",
      key: "med_qual_2",
    },
    {
      label: "MBBS - Bachelor of Medicine, Bachelor of Surgery",
      value: "MBBS",
      key: "med_qual_3",
    },
    {
      label: "BDS - Bachelor of Dental Surgery",
      value: "BDS",
      key: "med_qual_4",
    },
    {
      label: "DMD - Doctor of Dental Medicine",
      value: "DMD",
      key: "med_qual_5",
    },
    {
      label: "DVM - Doctor of Veterinary Medicine",
      value: "DVM",
      key: "med_qual_6",
    },
    {
      label: "PharmD - Doctor of Pharmacy",
      value: "PharmD",
      key: "med_qual_7",
    },
    {
      label: "DPT - Doctor of Physical Therapy",
      value: "DPT",
      key: "med_qual_8",
    },
    { label: "DC - Doctor of Chiropractic", value: "DC", key: "med_qual_9" },
    { label: "PsyD - Doctor of Psychology", value: "PsyD", key: "med_qual_10" },
    {
      label: "PhD - Doctor of Philosophy (in various medical fields)",
      value: "PhD",
      key: "med_qual_11",
    },

    // Nursing Qualifications
    { label: "RN - Registered Nurse", value: "RN", key: "nurs_qual_1" },
    {
      label: "LPN/LVN - Licensed Practical Nurse/Licensed Vocational Nurse",
      value: "LPN/LVN",
      key: "nurs_qual_2",
    },
    {
      label: "BSN - Bachelor of Science in Nursing",
      value: "BSN",
      key: "nurs_qual_3",
    },
    {
      label: "MSN - Master of Science in Nursing",
      value: "MSN",
      key: "nurs_qual_4",
    },
    { label: "NP - Nurse Practitioner", value: "NP", key: "nurs_qual_5" },
    {
      label: "CRNA - Certified Registered Nurse Anesthetist",
      value: "CRNA",
      key: "nurs_qual_6",
    },
    {
      label: "CNM - Certified Nurse-Midwife",
      value: "CNM",
      key: "nurs_qual_7",
    },

    // Physician Assistants
    {
      label: "PA-C - Certified Physician Assistant",
      value: "PA-C",
      key: "phys_assist_1",
    },

    // Therapists and Rehabilitation Specialists
    {
      label: "BPT - Bachelor of Physiotherapy",
      value: "BPT",
      key: "therapist_1",
    },
    {
      label: "MPT - Master of Physiotherapy",
      value: "MPT",
      key: "therapist_2",
    },
    {
      label: "OTD - Doctor of Occupational Therapy",
      value: "OTD",
      key: "therapist_3",
    },
    {
      label: "MOT - Master of Occupational Therapy",
      value: "MOT",
      key: "therapist_4",
    },
    {
      label: "SLT/SLP - Speech-Language Therapist/Speech-Language Pathologist",
      value: "SLT/SLP",
      key: "therapist_5",
    },
  ];
  const expertFields = [
    { label: "Cardiology", value: "Cardiology", key: "med_spec_1" },
    { label: "Oncology", value: "Oncology", key: "med_spec_2" },
    { label: "Neurology", value: "Neurology", key: "med_spec_3" },
    { label: "Pediatrics", value: "Pediatrics", key: "med_spec_4" },
    {
      label: "Obstetrics and Gynecology",
      value: "Obstetrics and Gynecology",
      key: "med_spec_5",
    },
    { label: "Orthopedics", value: "Orthopedics", key: "med_spec_6" },
    { label: "Dermatology", value: "Dermatology", key: "med_spec_7" },
    { label: "Psychiatry", value: "Psychiatry", key: "med_spec_8" },
    { label: "Radiology", value: "Radiology", key: "med_spec_9" },
    { label: "Anesthesiology", value: "Anesthesiology", key: "med_spec_10" },
    {
      label: "Gastroenterology",
      value: "Gastroenterology",
      key: "med_spec_11",
    },
    { label: "Endocrinology", value: "Endocrinology", key: "med_spec_12" },
    { label: "Nephrology", value: "Nephrology", key: "med_spec_13" },
    { label: "Urology", value: "Urology", key: "med_spec_14" },
    { label: "Ophthalmology", value: "Ophthalmology", key: "med_spec_15" },
    { label: "Pulmonology", value: "Pulmonology", key: "med_spec_16" },
    {
      label: "Infectious Diseases",
      value: "Infectious Diseases",
      key: "med_spec_17",
    },
    { label: "Hematology", value: "Hematology", key: "med_spec_18" },
    { label: "Rheumatology", value: "Rheumatology", key: "med_spec_19" },
    {
      label: "Allergy and Immunology",
      value: "Allergy and Immunology",
      key: "med_spec_20",
    },
    { label: "Geriatrics", value: "Geriatrics", key: "med_spec_21" },
    {
      label: "Emergency Medicine",
      value: "Emergency Medicine",
      key: "med_spec_22",
    },
    { label: "Family Medicine", value: "Family Medicine", key: "med_spec_23" },
    {
      label: "Internal Medicine",
      value: "Internal Medicine",
      key: "med_spec_24",
    },
    { label: "General Surgery", value: "General Surgery", key: "med_spec_25" },
    { label: "Plastic Surgery", value: "Plastic Surgery", key: "med_spec_26" },
    {
      label: "Cardiothoracic Surgery",
      value: "Cardiothoracic Surgery",
      key: "med_spec_27",
    },
    { label: "Neurosurgery", value: "Neurosurgery", key: "med_spec_28" },
    {
      label: "Oral and Maxillofacial Surgery",
      value: "Oral and Maxillofacial Surgery",
      key: "med_spec_29",
    },
    {
      label: "Pediatric Surgery",
      value: "Pediatric Surgery",
      key: "med_spec_30",
    },
    {
      label: "Vascular Surgery",
      value: "Vascular Surgery",
      key: "med_spec_31",
    },
    {
      label: "Critical Care Medicine",
      value: "Critical Care Medicine",
      key: "med_spec_32",
    },
    { label: "Sports Medicine", value: "Sports Medicine", key: "med_spec_33" },
    { label: "Pain Medicine", value: "Pain Medicine", key: "med_spec_34" },
    {
      label: "Palliative Medicine",
      value: "Palliative Medicine",
      key: "med_spec_35",
    },
    { label: "Sleep Medicine", value: "Sleep Medicine", key: "med_spec_36" },
    {
      label: "Nuclear Medicine",
      value: "Nuclear Medicine",
      key: "med_spec_37",
    },
    {
      label: "Medical Genetics",
      value: "Medical Genetics",
      key: "med_spec_38",
    },
    { label: "Pathology", value: "Pathology", key: "med_spec_39" },
    {
      label: "Forensic Pathology",
      value: "Forensic Pathology",
      key: "med_spec_40",
    },
    { label: "Hematopathology", value: "Hematopathology", key: "med_spec_41" },
    {
      label: "Clinical Genetics",
      value: "Clinical Genetics",
      key: "med_spec_42",
    },
    {
      label: "Medical Microbiology",
      value: "Medical Microbiology",
      key: "med_spec_43",
    },
    {
      label: "Infectious Disease Medicine",
      value: "Infectious Disease Medicine",
      key: "med_spec_44",
    },
    {
      label: "Medical Toxicology",
      value: "Medical Toxicology",
      key: "med_spec_45",
    },
    {
      label: "Addiction Medicine",
      value: "Addiction Medicine",
      key: "med_spec_46",
    },
    { label: "Andrology", value: "Andrology", key: "med_spec_47" },
    {
      label: "Bariatric Medicine",
      value: "Bariatric Medicine",
      key: "med_spec_48",
    },
    {
      label: "Behavioral Health",
      value: "Behavioral Health",
      key: "med_spec_49",
    },
    {
      label: "Reproductive Endocrinology and Infertility",
      value: "Reproductive Endocrinology and Infertility",
      key: "med_spec_50",
    },
    {
      label: "Interventional Radiology",
      value: "Interventional Radiology",
      key: "med_spec_51",
    },
  ];
  return (
    <div className="bg-shade-color">
      <Line />
      <div className="bg-shade-color p-3 pl-10 pt-4 flex justify-center  w-full h-full">
        <div className="w-8/12 bg-white  m-8">
          <div className="p-4 flex flex-row justify-between items-center">
            <p className="tracking-tight text-2xl  text-black-color   font-medium">
              Edit Profile
            </p>
            <div className="flex flex-row justify-center items-center">
              <p className="font-medium text-md text-black-color mr-3 tracking-tight">
                Cancel
              </p>
              <Button text={"Save & Close"} />
            </div>
          </div>
          <Line />
          <div className="w-3/5 p-6 px-10">
            <div className="w-36 mb-2 relative h-36">
              <img
                src="https://randomuser.me/api/portraits/men/85.jpg"
                alt=""
                className="rounded-full absolute left-0 top-0 w-36 h-36"
              />
              <div className="bg-primary-color absolute p-2 rounded-full bottom-2 right-2">
                <MdEdit className="text-xl text-white" />
              </div>
            </div>

            <InputHolder label="Doctor Name">
              <InputField placeholder={"Enter Doctor Name"} />
            </InputHolder>
            <InputHolder label="Username">
              <InputField placeholder={"jhon_doe"} />
            </InputHolder>

            <InputHolder label="Qualification">
              <SelectInput
                isMulti={true}
                options={qualification}
                defaultValue={[qualification[4], qualification[5]]}
              />
            </InputHolder>
            <InputHolder label="Bio">
              <InputField placeholder={"Hey im Passionate"} />
            </InputHolder>
            <InputHolder label="Expert in">
              <SelectInput
                isMulti={true}
                options={expertFields}
                defaultValue={[expertFields[4], expertFields[5]]}
              />
            </InputHolder>
          </div>
        </div>
      </div>
    </div>
  );
}
