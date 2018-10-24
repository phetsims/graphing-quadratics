// Copyright 2018, University of Colorado Boulder

/**
 * Displays 'NO REAL ROOTS', used when a quadratic has no real roots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
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
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {Object} [options]
     */
    constructor( rootsVisibleProperty, quadraticProperty, options ) {

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

      const visibleProperty = new DerivedProperty(
        [ rootsVisibleProperty, quadraticProperty ],
        ( rootsVisible, quadratic ) =>
          rootsVisible && // the Roots checkbox is checked
          !!( quadratic.roots && quadratic.roots.length === 0 ) // the interactive quadratic has no roots
        );
      visibleProperty.linkAttribute( this, 'visible' );
    }
  }

  return graphingQuadratics.register( 'NoRealRootsNode', NoRealRootsNode );
} );