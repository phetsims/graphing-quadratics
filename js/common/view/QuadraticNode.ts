// Copyright 2018-2025, University of Colorado Boulder

/**
 * Draws the curve that is described by a quadratic equation.
 * The curve is labeled with the equation.
 * Performance is optimized to update only what's visible.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import platform from '../../../../phet-core/js/platform.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import GQEquationNode from '../../common/view/GQEquationNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQSymbols from '../GQSymbols.js';
import Quadratic from '../model/Quadratic.js';
import GQEquationFactory from './GQEquationFactory.js';
import { EquationForm } from './GQViewProperties.js';

type SelfOptions = {
  preventVertexAndEquationOverlap?: boolean; // prevent a parabola's vertex and equation from overlapping
} & PickOptional<PathOptions, 'lineWidth'>;

export type QuadraticNodeOptions = SelfOptions &
  PickOptional<NodeOptions, 'visibleProperty' | 'tandem' | 'phetioType' | 'phetioState' | 'phetioReadOnly'>;

export default class QuadraticNode extends Node {

  private readonly quadraticProperty: TReadOnlyProperty<Quadratic>;
  private readonly xRange: Range;
  private readonly yRange: Range;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly equationForm: EquationForm;
  private readonly preventVertexAndEquationOverlap: boolean;

  protected readonly quadraticPath: Path; // quadratic curve, y = ax^2 + bx + c
  private readonly equationNode: GQEquationNode; // equation on a translucent background

  // Makes positioning and rotating the equation a little easier to grok. equationParent will be rotated and translated,
  // while equationNode will be translated to adjust spacing between the equation and its associated curve.
  private readonly equationParent: Node;

  // ranges for equation placement, just inside the edges of the graph
  private readonly xEquationRange: Range;
  private readonly yEquationRange: Range;

  private readonly disposeQuadraticNode: () => void;

  /**
   * @param quadraticProperty - the quadratic to be rendered
   * @param xRange - range of the graph's x-axis
   * @param yRange - range of the graph's y-axis
   * @param modelViewTransform
   * @param equationForm - form of the equation displayed on the curve
   * @param equationsVisibleProperty
   * @param [providedOptions]
   */
  public constructor( quadraticProperty: TReadOnlyProperty<Quadratic>,
                      xRange: Range, yRange: Range,
                      modelViewTransform: ModelViewTransform2,
                      equationForm: EquationForm,
                      equationsVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions?: QuadraticNodeOptions ) {

    const options = optionize<QuadraticNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      preventVertexAndEquationOverlap: true,
      lineWidth: 1,

      // NodeOptions
      phetioVisiblePropertyInstrumented: false,

      // Workaround for https://github.com/phetsims/graphing-quadratics/issues/206. Safari 17.4 has SVG rendering issues
      // with quadratic curves. Use 'canvas' on QuadraticNode instead of this.quadraticPath to minimize the number of
      // Canvas instances that are created due to layering.
      // TODO: remove this workaround when the Safari issue is resolved, see https://github.com/phetsims/scenery/issues/1628
      renderer: platform.safari ? 'canvas' : null
    }, providedOptions );

    super( options );

    this.quadraticProperty = quadraticProperty;
    this.xRange = xRange;
    this.yRange = yRange;
    this.modelViewTransform = modelViewTransform;
    this.equationForm = equationForm;
    this.preventVertexAndEquationOverlap = options.preventVertexAndEquationOverlap;

    this.quadraticPath = new Path( null, {
      lineWidth: options.lineWidth
    } );
    this.addChild( this.quadraticPath );

    this.equationNode = new GQEquationNode( {
      maxWidth: 200 // determined empirically
    } );

    this.equationParent = new Node( { children: [ this.equationNode ] } );
    this.addChild( this.equationParent );

    this.xEquationRange =
      new Range( xRange.min + GQConstants.EQUATION_X_MARGIN, xRange.max - GQConstants.EQUATION_X_MARGIN );
    this.yEquationRange =
      new Range( yRange.min + GQConstants.EQUATION_Y_MARGIN, yRange.max - GQConstants.EQUATION_Y_MARGIN );

    // Updates this Node, but only when it's visible
    const quadraticListener = ( quadratic: Quadratic ) => {
      this.visible && this.update( quadratic );
    };
    quadraticProperty.link( quadraticListener ); // unlink required in dispose

    // Update the equation if it becomes visible, or if it's visible and one of its dynamic symbols changes.
    // Must be disposed.
    const multilink = new Multilink(
      [ equationsVisibleProperty, GQSymbols.yMarkupStringProperty, GQSymbols.xMarkupStringProperty, GQSymbols.xSquaredMarkupStringProperty ],
      ( visible, yString, xString, xSquaredString ) => {
        this.equationParent.visible = visible;
        visible && this.updateEquation( this.quadraticProperty.value, yString, xString, xSquaredString );
      } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => {
      visible && this.update( this.quadraticProperty.value );
    } );

    this.disposeQuadraticNode = () => {
      if ( quadraticProperty.hasListener( quadraticListener ) ) {
        quadraticProperty.unlink( quadraticListener );
      }
      multilink.dispose();
    };
  }

  public override dispose(): void {
    this.disposeQuadraticNode();
    super.dispose();
  }

  /**
   * Updates this Node to display the specified quadratic.
   */
  private update( quadratic: Quadratic ): void {

    // update shape
    const bezierControlPoints = quadratic.getControlPoints( this.xRange );
    this.quadraticPath.shape = new Shape()
      .moveToPoint( bezierControlPoints.startPoint )
      .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
      .transformed( this.modelViewTransform.getMatrix() );

    // update color
    this.quadraticPath.stroke = quadratic.color;

    // update equation
    this.updateEquation( quadratic, GQSymbols.yMarkupStringProperty.value, GQSymbols.xMarkupStringProperty.value, GQSymbols.xSquaredMarkupStringProperty.value );
  }

  /**
   * Updates the equation displayed on the quadratic.
   */
  private updateEquation( quadratic: Quadratic, yString: string, xString: string, xSquaredString: string ): void {

    // update the equation text
    if ( this.equationForm === 'standard' ) {
      this.equationNode.setTextString( GQEquationFactory.createStandardForm( quadratic, yString, xString, xSquaredString ) );
    }
    else {
      this.equationNode.setTextString( GQEquationFactory.createVertexForm( quadratic, yString, xString, xSquaredString ) );
    }

    // update the equation color
    this.equationNode.setTextFill( quadratic.color );

    // reset the origin for the equation
    this.equationNode.x = 0;
    this.equationNode.y = 0;

    // Position the equation.
    if ( quadratic.a === 0 ) {

      // straight line: equation above left end of line
      const x = this.xEquationRange.min;
      const p = quadratic.getClosestPointInRange( x, this.xEquationRange, this.yEquationRange );
      assert && assert( this.xRange.contains( p.x ) && this.yRange.contains( p.y ), `p is off the graph: ${p}` );

      // rotate to match line's slope
      this.equationParent.rotation = -Math.atan( quadratic.b );

      // move equation to (x,y)
      this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );

      // space between line and equation
      this.equationNode.bottom = -GQConstants.EQUATION_CURVE_SPACING;
    }
    else {
      const vertex = quadratic.vertex!;
      assert && assert( vertex );

      // parabola: pick a point on the parabola, at the edge of the graph
      const x = ( vertex.x >= 0 ) ? this.xEquationRange.min : this.xEquationRange.max;
      const p = quadratic.getClosestPointInRange( x, this.xEquationRange, this.yEquationRange );
      assert && assert( this.xRange.contains( p.x ) && this.yRange.contains( p.y ), `p is off the graph: ${p}` );

      // Width of the equation in model coordinates
      const equationModelWidth = Math.abs( this.modelViewTransform.viewToModelDeltaX( this.equationNode.width ) );

      if ( this.preventVertexAndEquationOverlap &&
           Math.abs( quadratic.a ) >= 0.75 && // a narrow parabola
           p.distance( vertex ) <= equationModelWidth ) {

        // When the equation and vertex are liable to overlap, place the equation (not rotated) to the left or right
        // of the parabola. See https://github.com/phetsims/graphing-quadratics/issues/39#issuecomment-426688827
        this.equationParent.rotation = 0;
        this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );
        if ( p.x < vertex.x ) {
          this.equationNode.right = -GQConstants.EQUATION_CURVE_SPACING;
        }
        else {
          this.equationNode.left = GQConstants.EQUATION_CURVE_SPACING;
        }
        if ( p.y < 0 ) {
          this.equationNode.bottom = 0;
        }
      }
      else {

        // Place the equation on outside the parabola, parallel to tangent line, at the edge of the graph.
        // rotate to match tangent's slope
        this.equationParent.rotation = -Math.atan( quadratic.getTangentSlope( p.x ) );

        // move equation to (x,y)
        this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );

        // when equation is on the right side of parabola, move its origin to the right end of the equation
        if ( p.x > vertex.x ) {
          this.equationNode.right = 0;
        }

        // space between tangent line and equation
        if ( quadratic.a >= 0 ) {
          this.equationNode.top = GQConstants.EQUATION_CURVE_SPACING;
        }
        else {
          this.equationNode.bottom = -GQConstants.EQUATION_CURVE_SPACING;
        }
      }
    }
  }
}

graphingQuadratics.register( 'QuadraticNode', QuadraticNode );