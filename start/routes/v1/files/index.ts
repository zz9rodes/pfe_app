import FilesController from "#controllers/files_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";


router.group(()=>{

    router.post('/create',[FilesController,'store'])
    router.delete('/:fileId/destroy',[FilesController,'destroy']).where('fileId',router.matchers.number())

}).prefix('/v1/api/files').use(middleware.auth())