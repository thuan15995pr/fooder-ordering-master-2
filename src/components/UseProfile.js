import {useEffect, useState} from "react";

import { useState, useEffect } from 'react';
import { FETCH_PROFILE } from './profileCommands';
import { FetchProfileCommand } from './profileCommands';

export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  const command = new FetchProfileCommand();

  useEffect(() => {
    setLoading(true);
    command.execute().then(data => {
      setData(data);
      setLoading(false);
    });
  }, [command]);

  return { loading, data };
}