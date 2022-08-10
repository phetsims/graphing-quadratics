// Copyright 2018-2022, University of Colorado Boulder

/**
 * Displays 'NO REAL ROOTS', used when a quadratic has no real roots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';

// const
const Y_OFFSET = 2; // min offset from vertex, determined empirically

class NoRealRootsNode extends Node {

  /**
   * @param {BooleanProperty} rootsVisibleProperty
   * @param {BooleanProperty} vertexVisibleProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( rootsVisibleProperty, vertexVisibleProperty, coordinatesVisibleProperty,
               quadraticProperty, modelViewTransform, options ) {

    options = merge( {

      // Node options
      maxWidth: 200, // determined empirically

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'displays NO REAL ROOTS when the interactive quadratic has no real roots'
    }, options );

    const textNode = new Text( graphingQuadraticsStrings.noRealRoots, {
      font: GQConstants.NO_REAL_ROOTS_FONT,
      fill: 'white'
    } );

    const backgroundNode = new Rectangle( textNode.bounds.dilatedXY( 5, 1 ), {
      fill: GQColors.ROOTS,
      opacity: 0.75,
      cornerRadius: 4,
      center: textNode.center
    } );

    assert && assert( !options.children, 'NoRealRootsNode sets children' );
    options.children = [ backgroundNode, textNode ];

    // visibility of this Node
    assert && assert( !options.visibleProperty, 'NoRealRootsNode sets visibleProperty' );
    options.visibleProperty = new DerivedProperty(
      [ rootsVisibleProperty, quadraticProperty ],
      ( rootsVisible, quadratic ) =>
        rootsVisible && // the Roots checkbox is checked
        !!( quadratic.roots && quadratic.roots.length === 0 ), // the interactive quadratic has no roots
      {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } );

    super( options );

    // Part of the graph where 'NO REAL ROOTS' may overlap with vertex coordinates, when 'NO REAL ROOTS' is
    // typically centered at the origin. Width is based on maxWidth, height was determined empirically.
    // See https://github.com/phetsims/graphing-quadratics/issues/88
    const vertexOverlapBounds = new Bounds2(
      modelViewTransform.viewToModelDeltaX( -0.6 * options.maxWidth ), -Y_OFFSET,
      modelViewTransform.viewToModelDeltaX( 0.6 * options.maxWidth ), Y_OFFSET );

    // The center of this Node, typically at the origin, except when that would overlap the vertex's coordinates.
    // In that case, position above or below the x axis, depending on which way the parabola opens.
    // See https://github.com/phetsims/graphing-quadratics/issues/88
    const centerProperty = new DerivedProperty(
      [ vertexVisibleProperty, coordinatesVisibleProperty, quadraticProperty ],
      ( vertexVisible, coordinatesVisible, quadratic ) => {
        if ( vertexVisible && // the Vertex checkbox is checked
             coordinatesVisible && // the Coordinates checkbox is checked
             ( quadratic.roots && quadratic.roots.length === 0 ) && // no roots
             // vertex is in a position where its coordinates will overlap
             ( quadratic.vertex && vertexOverlapBounds.containsPoint( quadratic.vertex ) ) ) {
          // center above or below the x axis, y offset determined empirically
          const y = quadratic.vertex.y + ( quadratic.a > 0 ? -Y_OFFSET : Y_OFFSET );
          return modelViewTransform.modelToViewXY( 0, y );
        }
        else {
          // center at the origin
          return modelViewTransform.modelToViewXY( 0, 0 );
        }
      }
    );
    centerProperty.linkAttribute( this, 'center' );
  }
}

graphingQuadratics.register( 'NoRealRootsNode', NoRealRootsNode );
export default NoRealRootsNode;