import { Button, Empty } from 'antd';
import React, { useState } from 'react';
import { trpc } from '../../../api/trpc';
import { MonitorHealthBar } from '../MonitorHealthBar';
import { useAllowEdit } from './useAllowEdit';
import {
  MonitorStatusPageEditForm,
  MonitorStatusPageEditFormValues,
} from './EditForm';
import clsx from 'clsx';
import { useRequest } from '../../../hooks/useRequest';
import { useNavigate } from 'react-router';
import { ColorSchemeSwitcher } from '../../ColorSchemeSwitcher';

interface MonitorStatusPageProps {
  slug: string;
}

export const MonitorStatusPage: React.FC<MonitorStatusPageProps> = React.memo(
  (props) => {
    const { slug } = props;

    const { data: info } = trpc.monitor.getPageInfo.useQuery({
      slug,
    });
    const editPageMutation = trpc.monitor.editPage.useMutation();
    const trpcUtils = trpc.useContext();
    const navigate = useNavigate();

    const allowEdit = useAllowEdit(info?.workspaceId);
    const [editMode, setEditMode] = useState(false);

    const monitorList = info?.monitorList ?? [];

    const [{ loading }, handleSave] = useRequest(
      async (values: MonitorStatusPageEditFormValues) => {
        if (!info) {
          return;
        }

        const newPageInfo = await editPageMutation.mutateAsync({
          id: info.id,
          workspaceId: info.workspaceId,
          ...values,
        });

        trpcUtils.monitor.getPageInfo.setData(
          {
            slug,
          },
          newPageInfo
        );
        setEditMode(false);

        if (info.slug !== newPageInfo.slug) {
          // if slug is changed, should to navigate to new url
          navigate(`/status/${newPageInfo.slug}`);
        }
      }
    );

    return (
      <div className="w-full h-full flex">
        {editMode && (
          <div className="w-1/3 overflow-auto py-8 px-4 border-r border-gray-300 dark:border-gray-600">
            <MonitorStatusPageEditForm
              isLoading={loading}
              initialValues={info ?? {}}
              onFinish={handleSave}
              onCancel={() => setEditMode(false)}
            />
          </div>
        )}
        <div
          className={clsx(
            'mx-auto py-8 px-4 overflow-auto',
            !editMode ? 'w-4/5' : 'w-2/3'
          )}
        >
          <div className="flex">
            <div className="text-2xl mb-4 flex-1">{info?.title}</div>

            <ColorSchemeSwitcher />
          </div>

          <div>
            {allowEdit && !editMode && (
              <Button type="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </div>

          <div className="text-lg mb-2">Services</div>

          {info && (
            <div className="shadow-2xl p-2.5">
              {monitorList.length > 0 ? (
                monitorList.map((item) => (
                  <div
                    key={item.id}
                    className="hover:bg-black hover:bg-opacity-20"
                  >
                    <MonitorHealthBar
                      workspaceId={info.workspaceId}
                      monitorId={item.id}
                      count={40}
                      size="large"
                      showCurrentStatus={true}
                    />
                  </div>
                ))
              ) : (
                <Empty description="No any monitor has been set" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
MonitorStatusPage.displayName = 'MonitorStatusPage';
