# SaluLink Chronic Treatment App

The SaluLink Specialist Aid Documentation App – Endocrine Model is designed to assist medical specialists and their assistant teams in documenting and managing endocrine disorder cases for PMB compliance, accurate ICD-10 coding, and treatment mapping.

## Features

### 🤖 AI-Powered Analysis
- **Authi 1.0 Model**: Uses ClinicalBERT for intelligent condition extraction from clinical notes
- **Supported Conditions**: Diabetes insipidus, Diabetes mellitus type 1, Diabetes mellitus type 2
- **Confidence Scoring**: Provides confidence levels for extracted conditions

### 📋 Complete Workflow
1. **Note Entry**: Paste or type patient notes
2. **Condition Identification**: AI extracts and confirms conditions
3. **ICD-10 Mapping**: Select appropriate ICD codes with descriptions
4. **Diagnostic Treatment**: Choose diagnostic procedures and tests
5. **Ongoing Management**: Select ongoing management procedures
6. **Medication Mapping**: Choose medications with CDA values and plan exclusions
7. **Documentation**: Add motivation letters or chronic registration notes
8. **Case Summary**: Generate comprehensive case documentation

### 💊 Medication Management
- **Plan-Specific CDA Values**: Different pricing for Core, Priority, Saver, Executive, and Comprehensive plans
- **Exclusion Handling**: Automatic detection of plan exclusions with motivation letter prompts
- **Medicine Classes**: Organized by therapeutic categories

### 📊 Case Management
- **Case History**: View all previous cases
- **Search & Filter**: Find cases by condition, date, or content
- **Statistics**: Track case metrics and condition distribution
- **Export Options**: Individual or bulk PDF export

### 📄 PDF Export
- **Comprehensive Reports**: Complete case summaries with all details
- **Professional Formatting**: Clean, medical-grade documentation
- **Multiple Cases**: Export summaries for multiple cases

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: ClinicalBERT integration (simulated)
- **Data Processing**: Papa Parse for CSV handling
- **PDF Generation**: jsPDF
- **UI Components**: Headless UI, Heroicons, Lucide React
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd salulink-chronic-treatment-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Data Structure

The app integrates with three CSV datasets:

### Endocrine CONDITIONS.csv
- Chronic condition names
- ICD-10 codes
- ICD-10 descriptions

### Endocrine TREATMENT.csv
- Diagnostic procedures and codes
- Ongoing management procedures
- Coverage limits and specialist requirements

### Endocrine MEDICINE.csv
- Medicine classes and active ingredients
- CDA values for different plan types
- Plan exclusions and restrictions

## Usage Guide

### Creating a New Case

1. **Enter Patient Notes**: Paste clinical notes into the text area
2. **Analyze**: Click "Analyse" to extract conditions using Authi 1.0
3. **Confirm Condition**: Select the correct condition from AI suggestions
4. **Select ICD Codes**: Choose appropriate ICD-10 codes
5. **Choose Treatments**: Select diagnostic and ongoing procedures
6. **Map Medications**: Select medications based on patient's plan
7. **Add Notes**: Include motivation letters or registration notes
8. **Export**: Generate PDF summary for submission

### Managing Cases

- **View Cases**: Access the case management interface
- **Search**: Find cases by condition or content
- **Filter**: Sort by date or condition type
- **Export**: Download individual or bulk PDF reports
- **Delete**: Remove cases as needed

## AI Model Details

### Authi 1.0 Implementation

The Authi 1.0 model simulates ClinicalBERT functionality with:

- **Keyword Matching**: Enhanced pattern recognition for diabetes conditions
- **Confidence Scoring**: Probability-based condition identification
- **Context Analysis**: Considers medical terminology and symptoms
- **Integration**: Seamless connection with treatment and medication data

### Supported Conditions

1. **Diabetes Insipidus**
   - ICD codes: E23.2, N25.1
   - Symptoms: Excessive thirst, urination
   - Treatments: U&E, Creatinine, Osmolality

2. **Diabetes Mellitus Type 1**
   - ICD codes: E10.x series
   - Characteristics: Insulin-dependent
   - Treatments: ECG, Microalbuminuria, HbA1c

3. **Diabetes Mellitus Type 2**
   - ICD codes: E11.x series
   - Characteristics: Non-insulin-dependent
   - Treatments: Similar to Type 1 with variations

## Medical Aid Plan Support

### Plan Types
- **KeyCare**: Basic coverage
- **Core/Priority/Saver**: Standard coverage
- **Executive/Comprehensive**: Premium coverage

### CDA Values
- Different pricing tiers for medications
- Plan-specific exclusions
- Automatic exclusion detection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software developed for SaluLink.

## Support

For technical support or questions, please contact the development team.

---

**Note**: This application is designed for medical professionals and should be used in accordance with healthcare regulations and best practices.
