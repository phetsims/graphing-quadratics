// Copyright 2018-2025, University of Colorado Boulder

/**
 * GQScreenView is the base class for ScreenViews in this sim.
 * It is responsible for creating Nodes that are common to all screens, and for common layout.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import EyeToggleButton from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQModel from '../model/GQModel.js';
import GQViewProperties from './GQViewProperties.js';
import PointToolNode from './PointToolNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

// constants
const X_SPACING = 15; // between graph and control panels

type SelfOptions = EmptySelfOptions;

export type GQScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem' | 'screenSummaryContent'>;

export default class GQScreenView extends ScreenView {

  public constructor( model: GQModel,
                      viewProperties: GQViewProperties,
                      graphNode: Node,
                      equationAccordionBox: Node,
                      graphControlPanel: Node,
                      providedOptions: GQScreenViewOptions ) {

    const options = optionize<GQScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // ScreenViewOptions
      layoutBounds: GQConstants.SCREEN_VIEW_LAYOUT_BOUNDS
    }, providedOptions );

    super( options );

    const leftPointToolNode = new PointToolNode(
      model.leftPointTool,
      model.modelViewTransform,
      model.graph,
      viewProperties.graphContentsVisibleProperty, {
        accessibleName: GraphingQuadraticsStrings.a11y.leftPointToolNode.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.leftPointToolNode.accessibleHelpTextStringProperty,
        tandem: options.tandem.createTandem( 'leftPointToolNode' )
      } );

    const rightPointToolNode = new PointToolNode(
      model.rightPointTool,
      model.modelViewTransform,
      model.graph,
      viewProperties.graphContentsVisibleProperty, {
        accessibleName: GraphingQuadraticsStrings.a11y.rightPointToolNode.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.rightPointToolNode.accessibleHelpTextStringProperty,
        tandem: options.tandem.createTandem( 'rightPointToolNode' )
      } );

    // Point tools moveToFront when dragged, so give them a common parent to preserve rendering order.
    const pointToolsParent = new Node( {
      children: [ leftPointToolNode, rightPointToolNode ]
    } );

    // Toggle button for showing/hiding contents of graph
    const graphContentsToggleButton = new EyeToggleButton( viewProperties.graphContentsVisibleProperty, {
      scale: 0.75,
      baseColor: new DerivedProperty( [ viewProperties.graphContentsVisibleProperty ],
        graphContentsVisible => graphContentsVisible ? 'white' : PhetColorScheme.BUTTON_YELLOW ),
      left: model.modelViewTransform.modelToViewX( model.graph.xRange.max ) + 21,
      bottom: model.modelViewTransform.modelToViewY( model.graph.yRange.min ),
      accessibleName: GraphingQuadraticsStrings.a11y.graphContentsToggleButton.accessibleNameStringProperty,
      accessibleHelpText: GraphingQuadraticsStrings.a11y.graphContentsToggleButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: new DerivedProperty( [ viewProperties.graphContentsVisibleProperty ],
        graphContentsVisible => graphContentsVisible ?
                                GraphingQuadraticsStrings.a11y.graphContentsToggleButton.accessibleContextResponseShownStringProperty :
                                GraphingQuadraticsStrings.a11y.graphContentsToggleButton.accessibleContextResponseHiddenStringProperty ),
      tandem: options.tandem.createTandem( 'graphContentsToggleButton' ),
      phetioDocumentation: 'button that shows/hides the contents of the graph'
    } );

    // Set maxWidth for each control panel individually
    const controlPanelMaxWidth = this.layoutBounds.width - graphNode.width - ( 2 * GQConstants.SCREEN_VIEW_X_MARGIN ) - X_SPACING;
    assert && assert( controlPanelMaxWidth > 0, `unexpected controlPanelMaxWidth: ${controlPanelMaxWidth}` );
    equationAccordionBox.maxWidth = controlPanelMaxWidth;
    graphControlPanel.maxWidth = controlPanelMaxWidth;

    // Parent for all control panels, to simplify layout
    const controlsParent = new VBox( {

      // set maxHeight to guard against font size differences across supported browsers
      maxHeight: this.layoutBounds.height - ( 2 * GQConstants.SCREEN_VIEW_Y_MARGIN ),
      align: 'center',
      spacing: 10,
      children: [
        equationAccordionBox,
        graphControlPanel
      ]
    } );

    // Horizontally center controls in the space to the right of the graph.
    controlsParent.boundsProperty.link( () => {
      controlsParent.centerX = graphNode.right + X_SPACING + ( controlPanelMaxWidth / 2 );
      controlsParent.top = GQConstants.SCREEN_VIEW_Y_MARGIN;
    } );

    // Reset All Button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // interrupt all listeners for this screen
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - GQConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - GQConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' ),
      phetioDocumentation: 'button that resets the screen to its initial state'
    } );

    // 'Coordinate Grid' accessible heading
    const coordinateGridHeading = new Node( {
      pdomOrder: [ graphNode ],
      accessibleHeading: GraphingQuadraticsStrings.a11y.accessibleHeadings.coordinateGridHeadingStringProperty
    } );

    const screenViewRootNode = new Node( {
      children: [

        // Accessible headings can be put anywhere in rendering order because they have no children. Put them all first.
        coordinateGridHeading,

        controlsParent,
        graphContentsToggleButton,
        graphNode,
        pointToolsParent,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      controlsParent,
      coordinateGridHeading
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      pointToolsParent,
      graphContentsToggleButton,
      resetAllButton
    ];
  }
}

graphingQuadratics.register( 'GQScreenView', GQScreenView );