import type { VideoConference } from '../../definition/videoConferences/IVideoConference';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';
import { BaseBridge } from './BaseBridge';

export abstract class VideoConferenceBridge extends BaseBridge {
    public async doGetById(callId: string, appId: string): Promise<VideoConference> {
        if (this.hasReadPermission(appId)) {
            return this.getById(callId, appId);
        }
    }

    public async doUpdate(call: VideoConference, appId: string): Promise<void> {
        if (this.hasWritePermission(appId)) {
            return this.update(call, appId);
        }
    }

    protected abstract getById(callId: string, appId: string): Promise<VideoConference>;
    protected abstract update(call: VideoConference, appId: string): Promise<void>;

    private hasWritePermission(appId: string): boolean {
        if (AppPermissionManager.hasPermission(appId, AppPermissions.videoConference.write)) {
            return true;
        }

        AppPermissionManager.notifyAboutError(new PermissionDeniedError({
            appId,
            missingPermissions: [AppPermissions.videoConference.write],
        }));

        return false;
    }

    private hasReadPermission(appId: string): boolean {
        if (AppPermissionManager.hasPermission(appId, AppPermissions.videoConference.read)) {
            return true;
        }

        AppPermissionManager.notifyAboutError(new PermissionDeniedError({
            appId,
            missingPermissions: [AppPermissions.videoConference.read],
        }));

        return false;
    }
}
