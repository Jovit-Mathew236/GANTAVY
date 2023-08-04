"use client";
import InputField from "@/src/components/atom/inputField/inputField";
import PlainButton from "@/src/components/atom/plainButton/plainButton";
import Container from "@/src/components/molecules/Container/container";
import InputHolder from "@/src/components/molecules/inputHolder/inputHolder";
import SelectInput from "@/src/components/molecules/select/select";
import ClinicDetailsHeader from "@/src/components/organisms/clinicDetailsHeader/clinicDetailsHeader";
import Line from "@/src/components/atom/line/line";
import TimePicker from "@/src/components/organisms/timePicker/timePicker";
import InfoText from "../../atom/infotext/infotext";
import DetailsPageContainer from "../../molecules/detailsPageContainer/detailPageContainer";
export default function TimingPage() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <DetailsPageContainer>
      <ClinicDetailsHeader heading="Add Clinic Timing" />
      <Line />
      <div className="w-5/5 ">
        <Container>
          <InputHolder label="Date range">
            <p className="tracking-tight text-md mb-1 mt-2">
              Patients can schedule...
            </p>
            <div className="flex flex-row items-center">
              <InputField type={"number"} placeholder={"Weekdays"} />
              <InfoText text=" into the future" />
            </div>
          </InputHolder>
        </Container>
        <Line />
        <Container>
          <InputHolder label="How do you want to offer your availability">
            <div className="flex mb-2 flex-row">
              <PlainButton text="Slot Based" styles={`ml-0`} />
              <PlainButton text="Token Based" styles={`ml-1`} />
            </div>

            <div className="flex flex-row mb-2 items-center">
              <InputHolder label="Duration">
                <div className="flex flex-row items-center">
                  <InputField type={"number"} placeholder={"in Minutes"} />

                  <InfoText text="Define how long your consultation will be" />
                </div>
              </InputHolder>
            </div>
            <TimePicker />
          </InputHolder>
        </Container>
        <Line />
        <InputHolder label="Clinic Category">
          <SelectInput
            isMulti={true}
            options={options}
            defaultValue={[options[4], options[5]]}
          />
        </InputHolder>
      </div>
    </DetailsPageContainer>
  );
}
