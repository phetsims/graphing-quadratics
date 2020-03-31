// Copyright 2018-2020, University of Colorado Boulder

/**
 * Displays '(x, y)' coordinates.  If the coordinates are null, this displays '(?, ?)'.
 * Performance is optimized to update only when visible.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import graphingQuadraticsStrings from '../../graphingQuadraticsStrings.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';

const coordinateUnknownString = graphingQuadraticsStrings.coordinateUnknown;

class CoordinatesNode extends Node {

  /**
   * @param {Property.<Vector2|null>} coordinatesProperty
   * @param {Object} [options]
   */
  constructor( coordinatesProperty, options ) {

    options = merge( {
      decimals: 0,
      font: GQConstants.COORDINATES_FONT,
      foregroundColor: 'black',
      backgroundColor: 'white',
      backgroundOpacity: 0.75,
      cornerRadius: 4,
      xMargin: 4,
      yMargin: 2,
      maxWidth: 100 // determined empirically
    }, options );

    // the coordinates
    const foregroundNode = new Text( '', {
      font: options.font,
      fill: options.foregroundColor
    } );

    // rectangle behind the coordinates
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      fill: options.backgroundColor,
      opacity: options.backgroundOpacity,
      cornerRadius: options.cornerRadius
    } );

    assert && assert( !options.children, 'CoordinatesNode sets children' );
    options.children = [ backgroundNode, foregroundNode ];

    super( options );

    // @private needed by methods
    this.coordinatesProperty = coordinatesProperty;
    this.decimals = options.decimals;
    this.xMargin = options.xMargin;
    this.yMargin = options.yMargin;
    this.foregroundNode = foregroundNode;
    this.backgroundNode = backgroundNode;

    coordinatesProperty.link( coordinates => {
      if ( this.visible ) {
        this.update( coordinates );
      }
    } );
  }

  /**
   * Sets the foreground color, the color of the coordinates.
   * @param {Color|string} color
   * @public
   */
  set foreground( color ) { this.foregroundNode.fill = color; }

  /**
   * Sets the background color, the color of the rectangle behind the coordinates.
   * @param {Color|string} color
   * @public
   */
  set background( color ) { this.backgroundNode.fill = color; }

  /**
   * Sets the visibility of this Node. Update is deferred until this Node becomes visible.
   * @param {boolean} visible
   * @public
   * @override
   */
  setVisible( visible ) {
    super.setVisible( visible );
    if ( visible ) {
      this.update( this.coordinatesProperty.value );
    }
  }

  /**
   * Updates this Node.
   * @param {Vector2} coordinates
   * @private
   */
  update( coordinates ) {

    // coordinates
    const x = coordinates ? Utils.toFixedNumber( coordinates.x, this.decimals ) : coordinateUnknownString;
    const y = coordinates ? Utils.toFixedNumber( coordinates.y, this.decimals ) : coordinateUnknownString;
    this.foregroundNode.text = '(' + x + ', ' + y + ')';

    // resize background
    this.backgroundNode.setRect( 0, 0,
      this.foregroundNode.width + ( 2 * this.xMargin ), this.foregroundNode.height + ( 2 * this.yMargin ) );

    // center coordinates in background
    this.foregroundNode.center = this.backgroundNode.center;
  }
}

graphingQuadratics.register( 'CoordinatesNode', CoordinatesNode );
export default CoordinatesNode;