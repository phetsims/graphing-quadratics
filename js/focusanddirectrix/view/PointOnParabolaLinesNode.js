// Copyright 2018-2020, University of Colorado Boulder

/**
 * Dashed lines that connect the 'point on parabola' to the focus and directrix.
 * The visibility of the point-focus and point-directrix lines is controlled independently.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class PointOnParabolaLinesNode extends Node {

  /**
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Vector2Property} pointOnParabolaProperty - the point
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<Boolean>} pointOnParabolaVisibleProperty
   * @param {Property.<Boolean>} focusVisibleProperty
   * @param {Property.<Boolean>} directrixVisibleProperty
   */
  constructor( quadraticProperty, pointOnParabolaProperty, modelViewTransform,
               pointOnParabolaVisibleProperty, focusVisibleProperty, directrixVisibleProperty ) {

    const pathOptions = {
      stroke: GQColors.POINT_ON_PARABOLA,
      lineWidth: GQConstants.POINT_ON_PARABOLA_LINE_WIDTH,
      lineDash: GQConstants.POINT_ON_PARABOLA_LINE_DASH
    };

    // line connecting point and focus
    const focusLine = new Line( 0, 0, 0, 1, pathOptions );

    // line connecting point and directrix                                             
    const directrixLine = new Line( 0, 0, 0, 1, pathOptions );

    super( { children: [ focusLine, directrixLine ] } );

    // update the lines
    Property.multilink( [ quadraticProperty, pointOnParabolaProperty ],
      ( quadratic, pointOnParabola ) => {

        assert && assert( quadratic.isaParabola(), `expected a parabola, quadratic=${quadratic}` );

        const pointView = modelViewTransform.modelToViewPosition( pointOnParabola );
        const focusView = modelViewTransform.modelToViewPosition( quadratic.focus );
        const directrixView = modelViewTransform.modelToViewY( quadratic.directrix );

        focusLine.setLine( pointView.x, pointView.y, focusView.x, focusView.y );
        directrixLine.setLine( pointView.x, pointView.y, pointView.x, directrixView );
      } );

    // visibility of line connecting point and focus
    const focusLineVisibleProperty = new DerivedProperty(
      [ pointOnParabolaVisibleProperty, focusVisibleProperty ],
      ( pointOnParabolaVisible, focusVisibleProperty ) => {
        return ( pointOnParabolaVisible && focusVisibleProperty );
      } );
    focusLineVisibleProperty.linkAttribute( focusLine, 'visible' );

    // visibility of line connecting point and directrix
    const directrixLineVisibleProperty = new DerivedProperty(
      [ pointOnParabolaVisibleProperty, directrixVisibleProperty ],
      ( pointOnParabolaVisible, directrixVisible ) => {
        return ( pointOnParabolaVisible && directrixVisible );
      } );
    directrixLineVisibleProperty.linkAttribute( directrixLine, 'visible' );
  }
}

graphingQuadratics.register( 'PointOnParabolaLinesNode', PointOnParabolaLinesNode );
export default PointOnParabolaLinesNode;