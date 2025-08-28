// Copyright 2021-2025, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import graphingQuadratics from './graphingQuadratics.js';

type StringsType = {
  'graphing-quadratics': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'exploreStringProperty': LocalizedStringProperty;
    'standardFormStringProperty': LocalizedStringProperty;
    'vertexFormStringProperty': LocalizedStringProperty;
    'focusAndDirectrixStringProperty': LocalizedStringProperty;
  };
  'vertexStringProperty': LocalizedStringProperty;
  'axisOfSymmetryStringProperty': LocalizedStringProperty;
  'rootsStringProperty': LocalizedStringProperty;
  'coordinatesStringProperty': LocalizedStringProperty;
  'equationsStringProperty': LocalizedStringProperty;
  'noRealRootsStringProperty': LocalizedStringProperty;
  'pointOnParabolaStringProperty': LocalizedStringProperty;
  'quadraticTermsStringProperty': LocalizedStringProperty;
  'directrixStringProperty': LocalizedStringProperty;
  'focusStringProperty': LocalizedStringProperty;
  'xStringProperty': LocalizedStringProperty;
  'yStringProperty': LocalizedStringProperty;
  'aStringProperty': LocalizedStringProperty;
  'bStringProperty': LocalizedStringProperty;
  'cStringProperty': LocalizedStringProperty;
  'hStringProperty': LocalizedStringProperty;
  'kStringProperty': LocalizedStringProperty;
  'pStringProperty': LocalizedStringProperty;
  'coordinateUnknownStringProperty': LocalizedStringProperty;
  'a11y': {
    'allScreens': {
      'screenSummary': {
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetailsStringProperty': LocalizedStringProperty;
        'currentDetailsEmptyStringProperty': LocalizedStringProperty;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'exploreScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
      }
    };
    'standardFormScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
      }
    };
    'vertexFormScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
      };
      'equationAccordionBox': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'focusAndDirectrixScreen': {
      'screenButtonsHelpTextStringProperty': LocalizedStringProperty;
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
      };
      'equationAccordionBox': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'equationAccordionBox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'quadraticTermsAccordionBox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'graphContentsToggleButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseHiddenStringProperty': LocalizedStringProperty;
      'accessibleContextResponseShownStringProperty': LocalizedStringProperty;
    };
    'saveButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'eraseButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'vertexManipulator': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
    };
    'focusManipulator': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
    };
    'pointOnParabolaManipulator': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
    };
    'pointToolNode': {
      'accessibleObjectResponseStringProperty': LocalizedStringProperty;
      'accessibleObjectResponseNoPointStringProperty': LocalizedStringProperty;
    };
    'leftPointToolNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'rightPointToolNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'quadraticTermCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'linearTermCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'constantTermCheckbox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'equationsCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'vertexManipulatorCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'vertexPointCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'axisOfSymmetryCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'rootsCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'coordinatesCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'focusCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'directrixCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'pointOnParabolaCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'aSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'bSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'cSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'pSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'hSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'kSlider': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'aPicker': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'bPicker': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'cPicker': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'hPicker': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'kPicker': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'accessibleHeadings': {
      'graphAreaHeadingStringProperty': LocalizedStringProperty;
      'parabolaFeaturesHeadingStringProperty': LocalizedStringProperty;
    };
    'standardFormEquationNode': {
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'vertexFormEquationNode': {
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'focusAndDirectrixFormEquationNode': {
      'accessibleParagraphStringProperty': LocalizedStringProperty;
    };
    'graphAreaCurrentlyContainsStringProperty': LocalizedStringProperty;
    'contentsOfGraphAreaAreHiddenStringProperty': LocalizedStringProperty;
    'primaryParabolaStringProperty': LocalizedStringProperty;
    'primaryParabolaAtEquationStringProperty': LocalizedStringProperty;
    'savedParabolaStringProperty': LocalizedStringProperty;
    'savedParabolaAtEquationStringProperty': LocalizedStringProperty;
    'quadraticTermStringProperty': LocalizedStringProperty;
    'quadraticTermAtEquationStringProperty': LocalizedStringProperty;
    'linearTermStringProperty': LocalizedStringProperty;
    'linearTermAtEquationStringProperty': LocalizedStringProperty;
    'constantTermStringProperty': LocalizedStringProperty;
    'constantTermAtEquationStringProperty': LocalizedStringProperty;
    'axisOfSymmetryAtEquationStringProperty': LocalizedStringProperty;
    'directrixAtEquationStringProperty': LocalizedStringProperty;
    'vertexAtCoordinatesStringProperty': LocalizedStringProperty;
    'movableVertexStringProperty': LocalizedStringProperty;
    'movableVertexAtCoordinatesStringProperty': LocalizedStringProperty;
    'focusAtCoordinatesStringProperty': LocalizedStringProperty;
    'movableFocusStringProperty': LocalizedStringProperty;
    'movableFocusAtStringProperty': LocalizedStringProperty;
    'movablePointOnParabolaStringProperty': LocalizedStringProperty;
    'movablePointOnParabolaAtCoordinatesStringProperty': LocalizedStringProperty;
    'rootsAtCoordinates1StringProperty': LocalizedStringProperty;
    'rootsAtCoordinates2StringProperty': LocalizedStringProperty;
    'equalsStringProperty': LocalizedStringProperty;
    'plusStringProperty': LocalizedStringProperty;
    'minusStringProperty': LocalizedStringProperty;
    'timesStringProperty': LocalizedStringProperty;
    'squaredStringProperty': LocalizedStringProperty;
    'negativeStringProperty': LocalizedStringProperty;
    'theQuantityStringProperty': LocalizedStringProperty;
  }
};

const GraphingQuadraticsStrings = getStringModule( 'GRAPHING_QUADRATICS' ) as StringsType;

graphingQuadratics.register( 'GraphingQuadraticsStrings', GraphingQuadraticsStrings );

export default GraphingQuadraticsStrings;
