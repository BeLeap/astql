import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import * as React from 'react';

import { Directory } from './Directory';
import { File } from './File';

export interface Props {
  prefixedPath: string;
  files: SandpackBundlerFiles;
  selectFile: (path: string) => void;
  createFile: (path: string) => void;
  deleteFile: (path: string) => void;
  activePath: string;
  depth?: number;
}

export class ModuleList extends React.PureComponent<Props> {
  render(): JSX.Element {
    const {
      depth = 0,
      activePath,
      selectFile,
      createFile,
      deleteFile,
      prefixedPath,
      files,
    } = this.props;

    const fileListWithoutPrefix = Object.keys(files)
      .filter((file) => file.startsWith(prefixedPath))
      .map((file) => file.substring(prefixedPath.length));

    const directoriesToShow = new Set(
      fileListWithoutPrefix
        .filter((file) => file.includes('/'))
        .map((file) => `${prefixedPath}${file.split('/')[0]}/`)
    );

    const filesToShow = fileListWithoutPrefix
      .filter((file) => !file.includes('/'))
      .map((file) => ({ path: `${prefixedPath}${file}` }));

    return (
      <div>
        {/* {directoriesToShow.size === 0 
        && filesToShow.length === 0 && (
          <File
            depth={0}
            path={'new file'}
            selectFile={this.props.selectFile}
            createFile={createFile}
            deleteFile={deleteFile}
          />
        ) } */}
        {Array.from(directoriesToShow).map((dir) => (
          <Directory
            key={dir}
            activePath={activePath}
            depth={depth + 1}
            files={files}
            prefixedPath={dir}
            selectFile={selectFile}
            createFile={createFile}
            deleteFile={deleteFile}
          />
        ))}

        {filesToShow.map((file) => (
          <File
            key={file.path}
            active={activePath === file.path}
            depth={depth + 1}
            path={file.path}
            selectFile={this.props.selectFile}
            createFile={createFile}
            deleteFile={deleteFile}
          />
        ))}
      </div>
    );
  }
}