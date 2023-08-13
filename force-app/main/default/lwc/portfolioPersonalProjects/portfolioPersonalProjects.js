import { LightningElement } from "lwc";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

const PROJECT_HOST = "https://avijainportfolio-dev-ed.develop.my.site.com";

export default class PortfolioPersonalProjects extends LightningElement {
  bmiAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`;
  weatherAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`;
  alarmClockAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`;
  currencyConverterAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`;
  surveyAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/Survey.png`;
  noteTakingAppImage = `${PortfolioAssets}/PortfolioAssets/Projects/NoteTakingApp.png`;

  projects;

  connectedCallback() {
    this.projects = [
      {
        name: "BMI Calculator App",
        img: this.bmiAppImage,
        link: PROJECT_HOST + "/bmi-calculator"
      },
      {
        name: "Weather App",
        img: this.weatherAppImage,
        link: PROJECT_HOST + "/weather-app"
      },
      {
        name: "Alarm Clock App",
        img: this.alarmClockAppImage,
        link: PROJECT_HOST + "/alarm-clock"
      },
      {
        name: "Currency Converter App",
        img: this.currencyConverterAppImage,
        link: PROJECT_HOST + "/currency-converter"
      },
      {
        name: "Survey App",
        img: this.surveyAppImage,
        link: "https://avijainportfolio-dev-ed.develop.my.site.com/survey/survey/runtimeApp.app?invitationId=0Ki2w0000006VhX&surveyName=employee_survey&UUID=44ab1102-35be-44ed-acfc-ae1ff88b281a"
      },
      {
        name: "Note Taking App",
        img: this.noteTakingAppImage,
        link: PROJECT_HOST + "/note-taking-app"
      }
    ];
  }
}
