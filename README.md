# BORDERLOGIX CORE

**Papua New Guinea SAD Document Generator for Asycuda World**

BORDERLOGIX CORE is an intelligent document processing application that extracts data from shipping documents (commercial invoices, packing lists, bills of lading) and generates Asycuda World-ready XML files for PNG Customs declarations.

## 🌟 Features

- **AI-Powered Document Extraction** - Uses Google Gemini to automatically extract data from PDFs and images
- **HS Code Integration** - Connected to the BORDERLOGIX HS Engine for accurate tariff classification
- **PNG Customs Compliant** - Generates XML files that conform to Asycuda World and PNG Customs requirements
- **Multi-Document Support** - Process commercial invoices, packing lists, B/Ls, and AWBs
- **Duty Calculation** - Automatically calculates import duties, GST, and other taxes

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BORDERLOGIX CORE                          │
│                core.borderlogixpng.com                       │
├─────────────────────────────────────────────────────────────┤
│  1. UPLOAD        2. EXTRACT         3. CLASSIFY            │
│  ┌──────────┐     ┌──────────┐       ┌──────────┐          │
│  │ Invoice  │────▶│ Google   │──────▶│ HS Engine│          │
│  │ Packing  │     │ AI Studio│       │ API Call │          │
│  │ BOL      │     │ (Gemini) │       │          │          │
│  └──────────┘     └──────────┘       └──────────┘          │
│                                            │                 │
│  4. CALCULATE     5. GENERATE        6. EXPORT              │
│  ┌──────────┐     ┌──────────┐       ┌──────────┐          │
│  │ Duties & │◀────│ SAD Form │──────▶│ AW-Ready │          │
│  │ Taxes    │     │ Template │       │ XML File │          │
│  └──────────┘     └──────────┘       └──────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI Studio API key (Gemini)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/borderlogix-core.git
cd borderlogix-core
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_HS_ENGINE_URL=https://hs.borderlogixpng.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
borderlogix-core/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Dashboard
│   │   ├── upload/             # Document upload
│   │   └── api/                # API routes
│   │       ├── extract/        # Document extraction
│   │       └── generate-xml/   # XML generation
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Shared UI components
│   │   └── forms/              # SAD form components
│   │
│   ├── lib/                    # Core libraries
│   │   ├── asycuda/            # Asycuda World XML generation
│   │   │   ├── xml-generator.ts
│   │   │   ├── sad-template.ts
│   │   │   └── field-mappings.ts
│   │   │
│   │   ├── ai/                 # AI extraction
│   │   │   ├── prompts.ts
│   │   │   └── extraction.ts
│   │   │
│   │   └── hs-integration/     # HS Engine client
│   │       └── api-client.ts
│   │
│   └── types/                  # TypeScript definitions
│       ├── asycuda.ts
│       └── documents.ts
│
├── data/                       # Reference data
├── public/                     # Static assets
└── vercel.json                 # Vercel deployment config
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google AI Studio API key | Yes |
| `NEXT_PUBLIC_HS_ENGINE_URL` | URL to HS classification engine | Yes |
| `PNG_CUSTOMS_OFFICE_DEFAULT` | Default customs office code | No |

### Supported Document Types

- **Commercial Invoice** (PDF, PNG, JPEG)
- **Packing List** (PDF, PNG, JPEG)
- **Bill of Lading** (PDF, PNG, JPEG)
- **Air Waybill** (PDF, PNG, JPEG)
- **Certificate of Origin** (PDF, PNG, JPEG)

## 📋 SAD Form Field Mapping

The application maps extracted data to Asycuda World SAD boxes:

| Box | Field | Source |
|-----|-------|--------|
| 1 | Declaration Type | Default: IM4 |
| 2 | Exporter | Invoice |
| 7 | Declarant Reference | User Input |
| 8 | Consignee | Invoice |
| 15-16 | Country of Export/Origin | Invoice |
| 18 | Vessel/Flight | B/L or AWB |
| 20 | Incoterms | Invoice |
| 22 | Currency & Amount | Invoice |
| 31 | Packages & Description | Packing List + Invoice |
| 33 | HS Code | HS Engine |
| 40 | B/L or AWB Number | B/L or AWB |
| 42 | Item Price | Invoice |
| 46 | Value for Duty | Calculated |
| 47 | Taxes | Calculated |

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Configure domain: `core.borderlogixpng.com`

```bash
vercel --prod
```

### DNS Configuration

Add CNAME record:
```
core.borderlogixpng.com → cname.vercel-dns.com
```

## 🔗 Integration with HS Engine

BORDERLOGIX CORE integrates with your existing HS classification engine:

```typescript
import { classifyProduct, calculateTariff } from '@/lib/hs-integration/api-client';

// Classify a product
const result = await classifyProduct({
  description: 'Spare parts for machinery',
  countryOfOrigin: 'MY'
});

// Calculate duties
const duties = await calculateTariff({
  hsCode: '84314900',
  cifValue: 10000,
  countryOfOrigin: 'MY'
});
```

## 📄 XML Output Format

Generated XML follows the Asycuda World schema:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ASYCUDA>
  <Property>
    <Sad_flow>I</Sad_flow>
    ...
  </Property>
  <Identification>
    <Office_segment>
      <Customs_clearance_office_code>POM</Customs_clearance_office_code>
      ...
    </Office_segment>
  </Identification>
  <Traders>...</Traders>
  <Item>...</Item>
</ASYCUDA>
```

## 🛡️ Compliance

- PNG Customs Act 1951
- PNG Customs Tariff Act
- WCO Harmonized System
- Asycuda World Standards

## 📞 Support

- Website: [borderlogixpng.com](https://www.borderlogixpng.com)
- HS Engine: [hs.borderlogixpng.com](https://hs.borderlogixpng.com)

## 📜 License

Proprietary - BORDERLOGIX PNG

---

Built with ❤️ for Papua New Guinea Economic Opertaors
