// Copyright 2018, University of Colorado Boulder

/**
 * Displays (x,y) coordinates for a location.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const pointXYString = require( 'string!GRAPHING_QUADRATICS/pointXY' );

  class CoordinatesNode extends Node {

    constructor( locationProperty, options ) {

      options = _.extend( {
        font: new PhetFont( 18 ),
        valueColor: 'white',
        backgroundColor: 'black',
        cornerRadius: 4,
        decimals: 0,
        xMargin: 3,
        yMargin: 1
      }, options );

      const backgroundNode = new Rectangle( 0, 0, 1, 1, {
        fill: options.backgroundColor,
        cornerRadius: options.cornerRadius
      });

      const valueNode = new Text( '', {
        font: options.font,
        fill: options.valueColor
      } );

      assert && assert( !options.children, 'CoordinatesNode sets children' );
      options.children = [ backgroundNode, valueNode ];

      super( options );

      const locationListener = location => {

        // coordinates
        valueNode.text = StringUtils.fillIn( pointXYString, {
          x: Util.toFixedNumber( location.x, options.decimals ),
          y: Util.toFixedNumber( location.y, options.decimals )
        } );

        // resize background
        backgroundNode.setRect( 0, 0, valueNode.width + ( 2 * options.xMargin ), valueNode.height + ( 2 * options.yMargin ) );

        // center coordinates in background
        valueNode.center = backgroundNode.center;
      };
      locationProperty.link( locationListener );

      // @private
      this.disposeCoordinatesNode = function() {
        locationProperty.unlink( locationListener );
      };
    }

    dispose() {
      this.disposeCoordinatesNode();
      super.dispose();
    }
  }

  return graphingQuadratics.register( 'CoordinatesNode', CoordinatesNode );
} );