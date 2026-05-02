# ePCR System - UI Design Guide

## Design Philosophy

The ePCR System features a modern, minimalist design inspired by contemporary task management applications, adapted for healthcare documentation. The design emphasizes clarity, professionalism, and ease of use.

---

## Color Palette

### Primary Colors
- **Cream Background**: `#f5f1e8` - Soft, warm background reducing eye strain
- **Dark Text**: `#1a1a1a` - High contrast for readability
- **Gray Text**: `#666` - Secondary text and labels
- **Light Gray**: `#e0e0e0` - Borders and dividers

### Accent Colors
- **Dark Accent**: `#2d2d2d` - Hover states and emphasis
- **Success**: `#4caf50` - Positive actions and confirmations
- **Warning**: `#ff9800` - Cautions and pending states
- **Danger**: `#f44336` - Errors and critical actions
- **Info**: `#2196f3` - Informational messages

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Weights
- **Light**: 300 - Large headings
- **Regular**: 400 - Body text
- **Medium**: 500 - Navigation links
- **Semi-Bold**: 600 - Labels and buttons
- **Bold**: 700 - Not used (prefer 600)

### Font Sizes
- **Headings**: 48px (h1), 36px (h2), 24px (h3)
- **Body**: 15-16px
- **Labels**: 11px uppercase with letter-spacing
- **Small**: 13-14px

### Text Styles
- **Uppercase Labels**: 11px, letter-spacing: 1-2px, font-weight: 600
- **Headings**: Font-weight: 300, letter-spacing: -0.5px
- **Body**: Line-height: 1.6

---

## Layout

### Spacing System
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **XL**: 32px
- **XXL**: 48px, 60px

### Container Widths
- **Max Width**: 1400px
- **Form Max Width**: 420px
- **Content Padding**: 40px (desktop), 20px (mobile)

### Border Radius
- **Small**: 4px - Buttons, inputs, badges
- **Medium**: 8px - Cards, containers
- **Large**: 16px - Modals (not used yet)

---

## Components

### Buttons

#### Primary Button
```css
background-color: #1a1a1a;
color: white;
padding: 12px 24px;
border-radius: 4px;
font-size: 13px;
letter-spacing: 0.5px;
text-transform: uppercase;
font-weight: 600;
```

**Hover State**: Background changes to `#2d2d2d`, slight translateY(-1px)

#### Secondary Button
```css
background-color: white;
color: #1a1a1a;
border: 1px solid #e0e0e0;
```

**Hover State**: Background changes to cream

#### Small Button
```css
padding: 8px 16px;
font-size: 11px;
```

### Form Inputs

#### Text Input
```css
padding: 12-14px 16px;
border: 1px solid #e0e0e0;
background-color: white;
border-radius: 4px;
font-size: 15px;
```

**Focus State**: Border color changes to `#1a1a1a`

#### Label
```css
font-size: 11px;
letter-spacing: 1px;
text-transform: uppercase;
color: #666;
font-weight: 600;
margin-bottom: 8px;
```

### Tables

#### Table Header
```css
background-color: #f5f1e8;
font-size: 11px;
letter-spacing: 1px;
text-transform: uppercase;
font-weight: 600;
padding: 16px;
```

#### Table Row
```css
padding: 16px;
border-bottom: 1px solid #e0e0e0;
```

**Hover State**: Background `rgba(0, 0, 0, 0.02)`

### Badges

#### Status Badge
```css
padding: 6px 12px;
border-radius: 4px;
font-size: 11px;
font-weight: 600;
letter-spacing: 0.5px;
text-transform: uppercase;
border: 1px solid [color with 0.3 opacity];
background: [color with 0.1 opacity];
```

**Variants**:
- Success: Green tones
- Warning: Orange tones
- Danger: Red tones
- Info: Blue tones

### Cards

#### Container Card
```css
background: white;
border-radius: 8px;
padding: 32px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
border: 1px solid #e0e0e0;
```

---

## Page Layouts

### Login/Register Page

**Structure**:
- Split layout: 50% sidebar, 50% content
- Sidebar: Brand header, footer with system info
- Content: Centered form with max-width 420px

**Sidebar**:
```
WELCOME TO EPCR — ELECTRONIC PATIENT CARE RECORD SYSTEM
[Content area]
EPCR · V1.0.0 | HEALTHCARE · DOCUMENTATION · QUALITY
```

**Form Area**:
- Large heading (48px, font-weight: 300)
- Descriptive paragraph
- Form with labeled inputs
- Primary action button
- Footer link to alternate action

### Dashboard Layout

**Structure**:
- Top navigation bar (70px height)
- Main content area (max-width: 1400px, padding: 40px)
- White cards with subtle shadows

### Navigation Bar

**Style**:
```css
background: white;
border-bottom: 1px solid #e0e0e0;
height: 70px;
```

**Brand**:
```
EPCR SYSTEM · V1.0.0
```

**Links**:
- Font-size: 13px
- Color: #666 (hover: #1a1a1a)
- Border-bottom on hover: 2px solid #1a1a1a

---

## Interactions

### Hover Effects
- **Buttons**: Background color change + translateY(-1px)
- **Links**: Color change + border-bottom
- **Table Rows**: Subtle background color
- **Cards**: None (keep simple)

### Focus States
- **Inputs**: Border color change to dark
- **Buttons**: Outline removed, rely on hover state

### Transitions
```css
transition: all 0.2s ease;
```

---

## Responsive Design

### Breakpoints
- **Desktop**: > 968px
- **Tablet/Mobile**: ≤ 968px

### Mobile Adaptations
- Hide login sidebar
- Center login form
- Reduce padding (40px → 20px)
- Stack form rows vertically
- Smaller font sizes for navigation

---

## Accessibility

### Contrast Ratios
- Dark text on cream: 12.6:1 (AAA)
- Gray text on cream: 4.8:1 (AA)
- White text on dark: 15.5:1 (AAA)

### Focus Indicators
- Visible border color change on focus
- No outline removal without alternative

### Semantic HTML
- Proper heading hierarchy
- Form labels associated with inputs
- Button elements for actions
- Nav elements for navigation

---

## Design Patterns

### Uppercase Labels
All form labels and section headers use:
```css
font-size: 11px;
letter-spacing: 1-2px;
text-transform: uppercase;
font-weight: 600;
color: #666;
```

### Light Headings
Main page headings use:
```css
font-size: 36-48px;
font-weight: 300;
letter-spacing: -0.5px;
color: #1a1a1a;
```

### Subtle Shadows
Cards and elevated elements use:
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
```

### Minimal Borders
```css
border: 1px solid #e0e0e0;
```

---

## Component Examples

### Page Header
```jsx
<div className="page-header">
  <h1>Patient Records</h1>
  <button className="btn btn-primary">New Record</button>
</div>
```

### Form Group
```jsx
<div className="form-group">
  <label htmlFor="username">Username</label>
  <input
    type="text"
    id="username"
    placeholder="Enter your username"
  />
</div>
```

### Status Badge
```jsx
<span className="badge badge-success">Approved</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Flagged</span>
```

### Table
```jsx
<table className="table">
  <thead>
    <tr>
      <th>Patient Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><span className="badge badge-success">Approved</span></td>
      <td><button className="btn btn-sm btn-secondary">View</button></td>
    </tr>
  </tbody>
</table>
```

---

## Best Practices

### Do's
✅ Use uppercase labels for form fields
✅ Maintain consistent spacing (8px increments)
✅ Use light font-weight for large headings
✅ Keep button text uppercase with letter-spacing
✅ Use subtle shadows and borders
✅ Maintain high contrast for text
✅ Use cream background to reduce eye strain

### Don'ts
❌ Don't use heavy font-weights (700+)
❌ Don't use bright, saturated colors
❌ Don't use large border-radius (keep ≤ 8px)
❌ Don't use drop shadows on everything
❌ Don't mix uppercase and sentence case in labels
❌ Don't use pure white (#fff) for backgrounds
❌ Don't use pure black (#000) for text

---

## Future Enhancements

### Planned Improvements
1. **Dark Mode**: Alternative color scheme for low-light environments
2. **Animation**: Subtle micro-interactions for better UX
3. **Loading States**: Skeleton screens and progress indicators
4. **Empty States**: Illustrations for empty data views
5. **Toast Notifications**: Non-intrusive success/error messages
6. **Modal Dialogs**: Consistent modal design system
7. **Data Visualization**: Charts and graphs for QA metrics
8. **Print Styles**: Optimized layouts for printing records

---

## Design System Maintenance

### Adding New Components
1. Follow existing patterns for consistency
2. Use CSS variables for colors
3. Maintain spacing system (8px increments)
4. Test on mobile and desktop
5. Ensure accessibility compliance
6. Document in this guide

### Updating Existing Components
1. Check all instances of the component
2. Update documentation
3. Test across all pages
4. Verify responsive behavior
5. Check accessibility

---

## Resources

### Design Inspiration
- TaskFlow (team-task-manager-szok.vercel.app)
- Modern minimalist web applications
- Healthcare documentation systems

### Tools
- Browser DevTools for testing
- Figma/Sketch for mockups (if needed)
- Accessibility testing tools

---

## Conclusion

This design system provides a modern, professional, and accessible interface for the ePCR System. The minimalist aesthetic reduces cognitive load while maintaining all necessary functionality for healthcare documentation.

The design emphasizes:
- **Clarity**: High contrast, clear typography
- **Professionalism**: Subtle colors, refined details
- **Usability**: Consistent patterns, intuitive interactions
- **Accessibility**: WCAG AA compliance, keyboard navigation

Maintain these principles when extending or modifying the system.
