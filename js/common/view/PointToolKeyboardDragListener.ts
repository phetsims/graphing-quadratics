// Copyright 2025, University of Colorado Boulder

/**
 * PointToolKeyboardDragListener handles keyboard input for a point tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PointTool from '../model/PointTool.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PointToolNode from './PointToolNode.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQGraph from '../model/GQGraph.js';
import SoundKeyboardDragListener, { SoundKeyboardDragListenerOptions } from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';

export class PointToolKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( pointToolNode: PointToolNode,
                      pointTool: PointTool,
                      modelViewTransform: ModelViewTransform2,
                      graph: GQGraph,
                      graphContentsVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const options: SoundKeyboardDragListenerOptions = {
      positionProperty: pointTool.positionProperty,
      transform: modelViewTransform,
      dragSpeed: 200,
      shiftDragSpeed: 50,

      start: ( event, listener ) => {

        pointTool.isDragging = true;

        // Move the tool that we're dragging to the foreground.
        pointToolNode.moveToFront();
      },

      drag: ( event, listener ) => {
        //TODO https://github.com/phetsims/graphing-quadratics/issues/216
      },

      end: ( event, listener ) => {
        pointTool.isDragging = false;
      },

      tandem: tandem
    };

    super( options );
  }
}

graphingQuadratics.register( 'PointToolKeyboardDragListener', PointToolKeyboardDragListener );