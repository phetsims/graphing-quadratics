// Copyright 2018-2025, University of Colorado Boulder

/**
 * GQCheckbox is a specialization of Checkbox to meet the "look" and feature needs of this simulation.
 * Specific option values provide the "look", and it adds an optional icon to the right of the text.
 * The constructor is private, and instances are instantiated via a set of public factory methods.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQSymbols from '../GQSymbols.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';

type SelfOptions = {
  string: TReadOnlyProperty<string> | string; // required string for text
  textFill?: TColor; // color of the text
  textMaxWidth?: number; // maxWidth of the text
  font?: PhetFont; // font for the text
  icon?: Node; // optional icon, to the right of the text
};

type GQCheckboxOptions = SelfOptions & WithRequired<CheckboxOptions, 'tandem' | 'phetioDocumentation'>;

export default class GQCheckbox extends Checkbox {

  protected constructor( booleanProperty: Property<boolean>, providedOptions: GQCheckboxOptions ) {

    const options = optionize<GQCheckboxOptions, StrictOmit<SelfOptions, 'icon'>, CheckboxOptions>()( {

      // SelfOptions
      textFill: 'black',
      textMaxWidth: 180, // determined empirically
      font: GQConstants.CHECKBOX_LABEL_FONT,
      mouseAreaXDilation: 5,
      mouseAreaYDilation: GQConstants.CHECKBOXES_Y_SPACING / 2,
      touchAreaXDilation: 5,
      touchAreaYDilation: GQConstants.CHECKBOXES_Y_SPACING / 2,

      // CheckboxOptions
      isDisposable: false
    }, providedOptions );

    const text = new RichText( options.string, {
      fill: options.textFill,
      font: options.font,
      maxWidth: options.textMaxWidth
    } );

    let content: Node = text;
    if ( options.icon ) {

      // Wrap HBox in a Node, so that horizontal space will not be added between text and icon when the checkbox
      // is put in some other scenery layout Node that uses stretch:true.
      // See https://github.com/phetsims/graphing-quadratics/issues/197
      content = new Node( {
        children: [
          new HBox( {
            align: 'center',
            spacing: 8,
            children: [ text, options.icon ]
          } )
        ]
      } );
    }

    super( booleanProperty, content, options );
  }

  /**
   * Creates the checkbox for the quadratic term, y = ax^2
   */
  public static createQuadraticTermCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {

      // y = ax^2
      string: new DerivedProperty(
        [ GQSymbols.yMarkupStringProperty, GQSymbols.aMarkupStringProperty, GQSymbols.xSquaredMarkupStringProperty ],
        ( y, a, x2 ) => `${y} ${MathSymbols.EQUAL_TO} ${a}${x2}` ),
      textFill: GQColors.QUADRATIC_TERM,
      accessibleName: GraphingQuadraticsStrings.a11y.quadraticTermCheckbox.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.quadraticTermCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.quadraticTermCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.quadraticTermCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible on the graph'
    } );
  }

  /**
   * Creates the checkbox for the linear term, y = bx
   */
  public static createLinearTermCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {

      // y = bx
      string: new DerivedProperty(
        [ GQSymbols.yMarkupStringProperty, GQSymbols.bMarkupStringProperty, GQSymbols.xMarkupStringProperty ],
        ( y, b, x ) => `${y} ${MathSymbols.EQUAL_TO} ${b}${x}` ),
      textFill: GQColors.LINEAR_TERM,
      accessibleName: GraphingQuadraticsStrings.a11y.linearTermCheckbox.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.linearTermCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.linearTermCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.linearTermCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible on the graph'
    } );
  }

  /**
   * Creates the checkbox for the constant term, y = c
   */
  public static createConstantTermCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {

      // y = c
      string: new DerivedProperty(
        [ GQSymbols.yMarkupStringProperty, GQSymbols.cMarkupStringProperty ],
        ( y, c ) => `${y} ${MathSymbols.EQUAL_TO} ${c}` ),
      textFill: GQColors.CONSTANT_TERM,
      accessibleName: GraphingQuadraticsStrings.a11y.constantTermCheckbox.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.constantTermCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.constantTermCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.constantTermCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that makes the constant term (y = c) visible on the graph'
    } );
  }

  /**
   * Creates the 'Axis of Symmetry' checkbox, with a vertical dashed line for the icon.
   */
  public static createAxisOfSymmetryCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.axisOfSymmetryStringProperty,
      icon: new Line( 0, 0, 0, 5 * GQConstants.AXIS_OF_SYMMETRY_LINE_DASH[ 0 ], {
        stroke: GQColors.axisOfSymmetryColorProperty,
        lineWidth: GQConstants.AXIS_OF_SYMMETRY_LINE_WIDTH,
        lineDash: GQConstants.AXIS_OF_SYMMETRY_LINE_DASH
      } ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.axisOfSymmetryCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.axisOfSymmetryCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.axisOfSymmetryCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that makes the axis of symmetry visible on the graph'
    } );
  }

  /**
   * Creates the 'Coordinates' checkbox.
   */
  public static createCoordinatesCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.coordinatesStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.coordinatesCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.coordinatesCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.coordinatesCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDocumentation: 'checkbox that makes the (x,y) coordinates visible on points on the graph'
    } );
  }

  /**
   * Creates the 'Directrix' checkbox, with a horizontal dashed line for the icon.
   */
  public static createDirectrixCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.directrixStringProperty,
      icon: new Line( 0, 0, 5 * GQConstants.DIRECTRIX_LINE_DASH[ 0 ], 0, {
        stroke: GQColors.directrixColorProperty,
        lineWidth: GQConstants.DIRECTRIX_LINE_WIDTH,
        lineDash: GQConstants.DIRECTRIX_LINE_DASH
      } ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.directrixCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.directrixCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.directrixCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows the directrix on the graph'
    } );
  }

  /**
   * Creates the 'Equations' checkbox.
   */
  public static createEquationsCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.equationsStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.equationsCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.equationsCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.equationsCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDocumentation: 'checkbox that shows equations on graphed curves'
    } );
  }

  /**
   * Creates the 'Focus' checkbox, with a manipulator icon.
   */
  public static createFocusCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.focusStringProperty,
      icon: Manipulator.createIcon( 8, GQColors.focusColorProperty ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.focusCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.focusCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.focusCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows the focus on the graph'
    } );
  }

  /**
   * Creates the 'Point on Parabola' checkbox, with a manipulator icon.
   */
  public static createPointOnParabolaCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.pointOnParabolaStringProperty,
      icon: Manipulator.createIcon( 8, GQColors.pointOnParabolaColorProperty ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.pointOnParabolaCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.pointOnParabolaCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.pointOnParabolaCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows the point on the parabola on the graph'
    } );
  }

  /**
   * Creates the 'Roots' checkbox, with a pair of flat points for the icon.
   */
  public static createRootsCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {

    const circleOptions = {
      radius: 6,
      fill: GQColors.rootsFillProperty,
      stroke: GQColors.rootsStrokeProperty,
      lineWidth: GQConstants.ROOTS_LINE_WIDTH
    };

    const icon = new HBox( {
      align: 'center',
      spacing: 5,
      children: [
        new Circle( circleOptions ),
        new Circle( circleOptions )
      ]
    } );

    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.rootsStringProperty,
      icon: icon,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.rootsCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.rootsCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.rootsCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows roots on the graph'
    } );
  }

  /**
   * Creates the 'Vertex' checkbox, with a flat point for the icon.
   */
  public static createVertexPointCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.vertexStringProperty,
      icon: new Circle( 6, { fill: GQColors.vertexColorProperty } ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.vertexPointCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.vertexPointCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.vertexPointCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows the vertex on the graph'
    } );
  }

  /**
   * Creates the 'Vertex' checkbox, with a manipulator icon.
   */
  public static createVertexManipulatorCheckbox( property: Property<boolean>, tandem: Tandem ): GQCheckbox {
    return new GQCheckbox( property, {
      string: GraphingQuadraticsStrings.vertexStringProperty,
      icon: Manipulator.createIcon( 8, GQColors.vertexColorProperty ),
      accessibleHelpText: GraphingQuadraticsStrings.a11y.vertexManipulatorCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: GraphingQuadraticsStrings.a11y.vertexManipulatorCheckbox.accessibleContextResponseCheckedStringProperty,
      accessibleContextResponseUnchecked: GraphingQuadraticsStrings.a11y.vertexManipulatorCheckbox.accessibleContextResponseUncheckedStringProperty,
      tandem: tandem,
      phetioDisplayOnlyPropertyInstrumented: true,
      phetioDocumentation: 'checkbox that shows the vertex manipulator on the graph'
    } );
  }
}

graphingQuadratics.register( 'GQCheckbox', GQCheckbox );