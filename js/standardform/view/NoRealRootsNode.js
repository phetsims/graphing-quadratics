// Copyright 2018, University of Colorado Boulder

/**
 * Displays 'NO REAL ROOTS', used when a quadratic has no real roots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const noRealRootsString = require( 'string!GRAPHING_QUADRATICS/noRealRoots' );

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

      options = _.extend( {
        tandem: Tandem.required
      }, options );

      const textNode = new Text( noRealRootsString, {
        font: new PhetFont( { size: 18, weight: 'bold' } ),
        fill: 'white',
        maxWidth: 300 // determined empirically
      } );

      const backgroundNode = new Rectangle( textNode.bounds.dilatedXY( 5, 1 ), {
        fill: GQColors.ROOTS,
        opacity: 0.75,
        cornerRadius: 4,
        center: textNode.center
      } );

      assert && assert( !options.children, 'NoRealRootsNode sets children' );
      options.children = [ backgroundNode, textNode ];

      super( options );

      // Part of the graph where 'NO REAL ROOTS' may overlap with vertex coordinates.
      // when 'NO REAL ROOTS' is typically centered at the origin.
      // See https://github.com/phetsims/graphing-quadratics/issues/88
      const vertexOverlapBounds = new Bounds2(
        modelViewTransform.viewToModelDeltaX( -this.width / 2 ), -1,
        modelViewTransform.viewToModelDeltaX( this.width / 2 ), 1 );

      const visibleProperty = new DerivedProperty(
        [ rootsVisibleProperty, quadraticProperty ],
        ( rootsVisible, quadratic ) =>
          rootsVisible && // the Roots checkbox is checked
          !!( quadratic.roots && quadratic.roots.length === 0 ) // the interactive quadratic has no roots
        );
      visibleProperty.linkAttribute( this, 'visible' );

      // Center on the origin, except when that would overlap the vertex's coordinates.
      // In that case, position above or below the x axis.
      // See https://github.com/phetsims/graphing-quadratics/issues/88
      const centerProperty = new DerivedProperty(
        [ vertexVisibleProperty, coordinatesVisibleProperty, quadraticProperty ],
        ( vertexVisible, coordinatesVisible, quadratic ) => {
          if ( vertexVisible && // the Vertex checkbox is checked
               coordinatesVisible && // the Coordinates checkbox is checked
               ( quadratic.roots && quadratic.roots.length === 0 ) && // no roots
               // vertex is in a position where its coordinates will overlap
               ( quadratic.vertex && vertexOverlapBounds.containsPoint( quadratic.vertex ) ) ) {
            // center above or below the x axis
            return modelViewTransform.modelToViewXY( 0, ( quadratic.a > 0 ? -1 : 1 ) );
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

  return graphingQuadratics.register( 'NoRealRootsNode', NoRealRootsNode );
} );