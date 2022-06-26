import React, {useState, useEffect} from 'react'
import worldID from "@worldcoin/id";
import { Button } from 'antd';
import { APP_NAME } from '../util/constants';

export const WorldIDComponent = ({
    signal,
    actionId,
    setProof,
    enabled,
  }) => {
    const enableWorldID = async () => {
      try {
        const result = await worldID.enable();
        setProof(result);
        console.log("World ID verified successfully: ", result);
      } catch (error) {
        console.error(error);
        // setTimeout(() => enableWorldID(), 500)
      }
    };
    useEffect(() => {
      if (!worldID.isInitialized()) {
        worldID.init("world-id-container", {
          app_name: APP_NAME,
          action_id: actionId,
          signal,
        });
      }
      if (!worldID.isEnabled()) {
        setTimeout(() => enableWorldID().catch(e => console.error(e)), 1000)
      }
    }, [enabled]);

    useEffect(() => {
        if(worldID.isInitialized()) {
            worldID.update({signal, action_id: actionId})
        }
    }, [signal, actionId])

    return <div className={enabled ? '' : 'display-hidden'} id="world-id-container" />

  };